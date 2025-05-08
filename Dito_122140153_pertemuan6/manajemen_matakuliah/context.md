# Project Context Summary

## development.ini

```ini
###
# app configuration
# https://docs.pylonsproject.org/projects/pyramid/en/latest/narr/environment.html
###

[app:main]
use = egg:manajemen_matakuliah

pyramid.reload_templates = true
pyramid.debug_authorization = false
pyramid.debug_notfound = false
pyramid.debug_routematch = false
pyramid.default_locale_name = en
pyramid.includes =
    pyramid_debugtoolbar

sqlalchemy.url = postgresql://postgres:Gilthunder2@localhost:5432/matakuliah_db

retry.attempts = 3

# By default, the toolbar only appears for clients from IP addresses
# '127.0.0.1' and '::1'.
# debugtoolbar.hosts = 127.0.0.1 ::1

[pshell]
setup = manajemen_matakuliah.pshell.setup

###
# wsgi server configuration
###

[alembic]
# path to migration scripts
script_location = manajemen_matakuliah/alembic
file_template = %%(year)d%%(month).2d%%(day).2d_%%(rev)s
# file_template = %%(rev)s_%%(slug)s

[server:main]
use = egg:waitress#main
listen = localhost:6543

###
# logging configuration
# https://docs.pylonsproject.org/projects/pyramid/en/latest/narr/logging.html
###

[loggers]
keys = root, manajemen_matakuliah, sqlalchemy

[handlers]
keys = console

[formatters]
keys = generic

[logger_root]
level = INFO
handlers = console

[logger_manajemen_matakuliah]
level = DEBUG
handlers =
qualname = manajemen_matakuliah

[logger_sqlalchemy]
level = WARN
handlers =
qualname = sqlalchemy.engine
# "level = INFO" logs SQL queries.
# "level = DEBUG" logs SQL queries and results.
# "level = WARN" logs neither.  (Recommended for production systems.)

[handler_console]
class = StreamHandler
args = (sys.stderr,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(asctime)s %(levelname)-5.5s [%(name)s:%(lineno)s][%(threadName)s] %(message)s

```


## initialize_db.py
**Path**: `D:\DITO\PERKULIAHAN\Sem 6\PEMWEB\Prak\Dito_122140153_Pertemuan6\manajemen_matakuliah\manajemen_matakuliah\scripts\initialize_db.py`

```python
import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """
    Add initial model objects.
    """
    # Tambahkan data awal untuk Mahasiswa
    matakuliah1 = models.MataKuliah(
        kode_mk='CS101',
        nama_mk='Algoritma dan Pemrograman',
        sks=3,
        semester=1
    )
    matakuliah2 = models.MataKuliah(
        kode_mk='CS102',
        nama_mk='Struktur Data',
        sks=3,
        semester=2
    )
    dbsession.add(matakuliah1)
    dbsession.add(matakuliah2)


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for description and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.
            ''')
```



## models/__init__.py
**Path**: `D:\DITO\PERKULIAHAN\Sem 6\PEMWEB\Prak\Dito_122140153_Pertemuan6\manajemen_matakuliah\manajemen_matakuliah\models\__init__.py`

```python
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import configure_mappers
import zope.sqlalchemy

# import or define all models here to ensure they are attached to the
# Base.metadata prior to any initialization routines
from .mymodel import MyModel  # flake8: noqa
from .matakuliah import MataKuliah

# run configure_mappers after defining all of the models to ensure
# all relationships can be setup
configure_mappers()


def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """
    Get a ``sqlalchemy.orm.Session`` instance backed by a transaction.

    This function will hook the session to the transaction manager which
    will take care of committing any changes.

    - When using pyramid_tm it will automatically be committed or aborted
      depending on whether an exception is raised.

    - When using scripts you should wrap the session in a manager yourself.
      For example::

          import transaction

          engine = get_engine(settings)
          session_factory = get_session_factory(engine)
          with transaction.manager:
              dbsession = get_tm_session(session_factory, transaction.manager)

    """
    dbsession = session_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager)
    return dbsession


def includeme(config):
    """
    Initialize the model for a Pyramid app.

    Activate this setup using ``config.include('manajemen_matakuliah.models')``.

    """
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'

    # use pyramid_tm to hook the transaction lifecycle to the request
    config.include('pyramid_tm')

    # use pyramid_retry to retry a request when transient exceptions occur
    config.include('pyramid_retry')

    session_factory = get_session_factory(get_engine(settings))
    config.registry['dbsession_factory'] = session_factory

    # make request.dbsession available for use in Pyramid
    config.add_request_method(
        # r.tm is the transaction manager used by pyramid_tm
        lambda r: get_tm_session(session_factory, r.tm),
        'dbsession',
        reify=True
    )
```



## models/meta.py
**Path**: `D:\DITO\PERKULIAHAN\Sem 6\PEMWEB\Prak\Dito_122140153_Pertemuan6\manajemen_matakuliah\manajemen_matakuliah\models\meta.py`

```python
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import MetaData

# Recommended naming convention used by Alembic, as various different database
# providers will autogenerate vastly different names making migrations more
# difficult. See: http://alembic.zzzcomputing.com/en/latest/naming.html
NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=NAMING_CONVENTION)
Base = declarative_base(metadata=metadata)
```



## models/mymodel.py
**Path**: `D:\DITO\PERKULIAHAN\Sem 6\PEMWEB\Prak\Dito_122140153_Pertemuan6\manajemen_matakuliah\manajemen_matakuliah\models\mymodel.py`

```python
from sqlalchemy import (
    Column,
    Index,
    Integer,
    Text,
)

from .meta import Base


class MyModel(Base):
    __tablename__ = 'models'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    value = Column(Integer)


Index('my_index', MyModel.name, unique=True, mysql_length=255)
```



## views/default.py
**Path**: `D:\DITO\PERKULIAHAN\Sem 6\PEMWEB\Prak\Dito_122140153_Pertemuan6\manajemen_matakuliah\manajemen_matakuliah\views\default.py`

```python
from pyramid.response import Response
from pyramid.view import view_config

from sqlalchemy.exc import DBAPIError

from .. import models


@view_config(route_name='home', renderer='../templates/mytemplate.jinja2')
def my_view(request):
    try:
        query = request.dbsession.query(models.MyModel)
        one = query.filter(models.MyModel.name == 'one').first()
    except DBAPIError:
        return Response(db_err_msg, content_type='text/plain', status=500)
    return {'one': one, 'project': 'Manajemen_Matakuliah'}


db_err_msg = """\
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for description and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.

After you fix the problem, please restart the Pyramid application to
try it again.
"""
```



## views/matakuliah.py
**Path**: `D:\DITO\PERKULIAHAN\Sem 6\PEMWEB\Prak\Dito_122140153_Pertemuan6\manajemen_matakuliah\manajemen_matakuliah\views\matakuliah.py`

```python
from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPFound,
    HTTPNotFound,
    HTTPBadRequest,
)
from ..models import MataKuliah


@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    """View untuk menampilkan daftar matakuliah"""
    dbsession = request.dbsession
    matakuliahs = dbsession.query(MataKuliah).all()
    return {'matakuliahs': [m.to_dict() for m in matakuliahs]}


@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    """View untuk melihat detail satu matakuliah"""
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']
    matakuliah = dbsession.query(MataKuliah).filter_by(id=matakuliah_id).first()
    
    if matakuliah is None:
        return HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})
    
    return {'matakuliah': matakuliah.to_dict()}


@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    """View untuk menambahkan matakuliah baru"""
    try:
        json_data = request.json_body
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        for field in required_fields:
            if field not in json_data:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})
        
        matakuliah = MataKuliah(
            kode_mk=json_data['kode_mk'],
            nama_mk=json_data['nama_mk'],
            sks=int(json_data['sks']),
            semester=int(json_data['semester']),
        )
        
        dbsession = request.dbsession
        dbsession.add(matakuliah)
        dbsession.flush()
        
        return {'success': True, 'matakuliah': matakuliah.to_dict()}
        
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    """View untuk mengupdate data matakuliah"""
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']
    matakuliah = dbsession.query(MataKuliah).filter_by(id=matakuliah_id).first()
    
    if matakuliah is None:
        return HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})
    
    try:
        json_data = request.json_body

        if 'kode_mk' in json_data:
            matakuliah.kode_mk = json_data['kode_mk']
        if 'nama_mk' in json_data:
            matakuliah.nama_mk = json_data['nama_mk']
        if 'sks' in json_data:
            matakuliah.sks = int(json_data['sks'])
        if 'semester' in json_data:
            matakuliah.semester = int(json_data['semester'])

        return {'success': True, 'matakuliah': matakuliah.to_dict()}
    
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    """View untuk menghapus data matakuliah"""
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']
    matakuliah = dbsession.query(MataKuliah).filter_by(id=matakuliah_id).first()
    
    if matakuliah is None:
        return HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})
    
    dbsession.delete(matakuliah)
    
    return {'success': True, 'message': f'Matakuliah dengan id {matakuliah_id} berhasil dihapus'}
```



## views/notfound.py
**Path**: `D:\DITO\PERKULIAHAN\Sem 6\PEMWEB\Prak\Dito_122140153_Pertemuan6\manajemen_matakuliah\manajemen_matakuliah\views\notfound.py`

```python
from pyramid.view import notfound_view_config


@notfound_view_config(renderer='../templates/404.jinja2')
def notfound_view(request):
    request.response.status = 404
    return {}
```



## views/__init__.py
**Path**: `D:\DITO\PERKULIAHAN\Sem 6\PEMWEB\Prak\Dito_122140153_Pertemuan6\manajemen_matakuliah\manajemen_matakuliah\views\__init__.py`

```python

```



## manajemen_matakuliah/__init__.py
**Path**: `D:\DITO\PERKULIAHAN\Sem 6\PEMWEB\Prak\Dito_122140153_Pertemuan6\manajemen_matakuliah\manajemen_matakuliah\__init__.py`

```python
from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.models')
        config.include('.routes')
        config.scan()
    return config.make_wsgi_app()
```



## routes.py
**Path**: `D:\DITO\PERKULIAHAN\Sem 6\PEMWEB\Prak\Dito_122140153_Pertemuan6\manajemen_matakuliah\manajemen_matakuliah\routes.py`

```python
def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')

    config.add_route('matakuliah_list', '/api/matakuliah', request_method='GET')
    config.add_route('matakuliah_detail', '/api/matakuliah/{id}', request_method='GET')
    config.add_route('matakuliah_add', '/api/matakuliah', request_method='POST')
    config.add_route('matakuliah_update', '/api/matakuliah/{id}', request_method='PUT')
    config.add_route('matakuliah_delete', '/api/matakuliah/{id}', request_method='DELETE')
```
