# **`IntDesk-backend`**

# Setup and Start

- install docker first
- git clone repo
- `docker build .`$$
- `docker-compose run django python manage.py makemigrations`
- `docker-compose run django python manage.py migrate`
- `docker-compose up`


Anytime you make changes to databas, do the following:
- `docker-compose run django python manage.py makemigrations`
- `docker-compose run django python manage.py migrate`

# Docker Commands
 
- **Build** `Dockerfile` 
  
    `docker build .`

- **Start Django Project** using `django` service defined inside docker-compose
  
    `docker-compose run django django-admin startproject intdesk_api .`

- **Start Django App**
  
    `docker-compose run django django-admin startapp questions`

- Run `docker-compose`
  
    `docker-compose up`

- To **build image** after making changes 

    `docker-compose up --build`

- **Migrate** database 

    `docker-compose run django python manage.py makemigrate`

- **Apply** migration

    `docker-compose run django python manage.py migrate`

- Crete **superuser** 

    `docker-compose run django python manage.py createsuperuser`

- Install **package**

    `docker-compose run django pip install drf-nested-routers`
