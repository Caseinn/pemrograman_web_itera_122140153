# Manajemen Mata Kuliah

## API Endpoints

### Mata Kuliah (Course) Endpoints

* GET `http://localhost:6543/api/matakuliah` - Mendapatkan semua data Mata Kuliah
* GET `http://localhost:6543/api/matakuliah/{id}` - Mendapatkan detail Mata Kuliah
* POST `http://localhost:6543/api/matakuliah` - Menambahkan Mata Kuliah baru
* PUT `http://localhost:6543/api/matakuliah/{id}` - Mengupdate data Mata Kuliah
* DELETE `http://localhost:6543/api/matakuliah/{id}` - Menghapus data Mata Kuliah

## Getting Started

Follow these steps to set up and run the Pyramid project.

### 1. Change directory into your newly created project

```bash
cd matakuliah
```

### 2. Create a Python virtual environment

```bash
python3 -m venv venv
venv/scripts/activate
```

### 3. Upgrade packaging tools

```bash
pip install --upgrade pip setuptools
```

### 4. Install the project in editable mode with its testing requirements

```bash
pip install -e ".[testing]"
```

### 5. Initialize and upgrade the database using Alembic

```bash
alembic -c development.ini revision --autogenerate -m "init"
alembic -c development.ini upgrade head
```

### 6. Load default data into the database using the initialization script

```bash
initialize_manajemen_matakuliah_db development.ini
```

### 7. Run your project

```bash
pserve development.ini
```