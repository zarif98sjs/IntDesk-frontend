FROM python:3.8-slim-buster
MAINTAINER IntDesk Inc. "zarif98sjs@gmail.com"
EXPOSE 8000

COPY ./requirements.txt /usr/src/app/requirements.txt

WORKDIR /usr/src/app

RUN pip install -r requirements.txt

ENV PYTHONUNBUFFERED 1

COPY . /usr/src/app

# RUN python manage.py collectstatic --noinput