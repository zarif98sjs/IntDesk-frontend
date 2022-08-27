# Generated by Django 4.0.1 on 2022-07-15 12:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('time_limit', models.CharField(default='1s', max_length=20)),
                ('memory_limit', models.CharField(default='256MB', max_length=20)),
                ('difficulty', models.CharField(choices=[('Easy', 'Easy'), ('Medium', 'Medium'), ('Hard', 'Hard')], default='Easy', max_length=20)),
                ('submission_count', models.IntegerField(default=0)),
                ('solve_count', models.IntegerField(default=0)),
                ('companies', models.ManyToManyField(to='problems.Company')),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subcategories', to='problems.category')),
            ],
        ),
        migrations.CreateModel(
            name='Solution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.TextField()),
                ('language', models.CharField(choices=[('c', 'c'), ('cpp', 'cpp'), ('java', 'java'), ('python', 'python')], default='c', max_length=20)),
                ('runtime', models.CharField(max_length=20)),
                ('memory_usage', models.CharField(max_length=20)),
                ('solve_status', models.CharField(choices=[('Pending', 'Pending'), ('Accepted', 'Accepted'), ('Wrong Answer', 'Wrong Answer'), ('Time Limit Exceeded', 'Time Limit Exceeded'), ('Memory Limit Exceeded', 'Memory Limit Exceeded'), ('Runtime Error', 'Runtime Error'), ('Compile Error', 'Compile Error')], default='Pending', max_length=50)),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='problems.problem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='solutions', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='problem',
            name='roles',
            field=models.ManyToManyField(to='problems.Role'),
        ),
        migrations.AddField(
            model_name='problem',
            name='subcategories',
            field=models.ManyToManyField(to='problems.SubCategory'),
        ),
        migrations.CreateModel(
            name='InputOutput',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('input', models.TextField()),
                ('output', models.TextField()),
                ('points', models.IntegerField(default=0)),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='input_outputs', to='problems.problem')),
            ],
        ),
        migrations.CreateModel(
            name='BookMark',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_added', models.DateTimeField(auto_now=True)),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='problems.problem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookmarks', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
