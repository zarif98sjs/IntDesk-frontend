from django import views
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from problems.models import (BookMark, Category, Company, InputOutput, Problem,
                             Role, Solution, SubCategory)
from problems.serializers import (BookMarkSerializer, CategorySerializer,
                                  CompanySerializer, InputOutputSerializer,
                                  ProblemSerializer, RoleSerializer,
                                  SolutionSerializer, SubCategorySerializer)


class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all().order_by('-id')
    serializer_class = ProblemSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        data = request.data
        print(data)
        problem = Problem.objects.create(
            name=data['title'],
            description=data['description'],
            time_limit=data['time_limit'],
            memory_limit=data['memory_limit'],
            difficulty=data['difficulty'],
            
        )
        if data.get('submission_count') is not None: problem.submission_count = data['submission_count']
        if data.get('solve_count') is not None: problem.solve_count = data['solve_count']
        problem.save()

        serializer = ProblemSerializer(problem)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    ## put request to update problem
    @transaction.atomic
    def update(self, request, *args, **kwargs):
        data = request.data
        problem = get_object_or_404(Problem, pk=kwargs['pk'])
        if data.get('title') is not None: problem.name = data['title']
        if data.get('description') is not None: problem.description = data['description']
        if data.get('time_limit') is not None: problem.time_limit = data['time_limit']
        if data.get('memory_limit') is not None: problem.memory_limit = data['memory_limit']
        if data.get('difficulty') is not None: problem.difficulty = data['difficulty']
        if data.get('submission_count') is not None: problem.submission_count = data['submission_count']
        if data.get('solve_count') is not None: problem.solve_count = data['solve_count']
        for role in problem.roles.all():
            problem.roles.remove(role)
        for subcategory in problem.subcategories.all():
            problem.subcategories.remove(subcategory)
        for company in problem.companies.all():
            problem.companies.remove(company)
        
        for input_output in problem.input_outputs.all():
            # problem.input_outputs.remove(input_output)
            input_output.delete()

        problem.save()
        serializer = ProblemSerializer(problem)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    ## get all companies of a problem
    @action(detail=True, methods=['GET'])
    def companies(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        companies = problem.companies.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)
    
    ## get all roles of a problem
    @action(detail=True, methods=['GET'])
    def roles(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        roles = problem.roles.all()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data)
    
    ## get all subcategories of a problem
    @action(detail=True, methods=['GET'])
    def subcategories(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        subcategories = problem.subcategories.all()
        serializer = SubCategorySerializer(subcategories, many=True)
        return Response(serializer.data)
    

    ## get all input outputs of a problem
    @action(detail=True, methods=['GET'])
    def input_outputs(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        input_outputs = problem.input_outputs.all()
        serializer = InputOutputSerializer(input_outputs, many=True)
        return Response(serializer.data)

    
    # add a list of companies to problem
    @action(detail=True, methods=['POST'])
    def company(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        data = request.data
        
        if data.get('companies') is None:
            raise ValueError("company list is required")

        companies_list = data.get('companies')

        for company_obj in companies_list:
            if company_obj.get('company') is None or company_obj.get('company') == '':
                continue
            company, created = Company.objects.get_or_create(name=company_obj.get('company').capitalize())
            if company_obj.get('description') is not None:
                company.description = company_obj.get('description')

            company.save()
            problem.companies.add(company) # need to do this specially for many to many relations
        
        serializer = ProblemSerializer(problem)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # add a list of roles to problem
    @action(detail=True, methods=['POST'])
    def role(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        data = request.data
        if data.get('roles') is None:
            raise ValueError("role list is required")

        role_list = data.get('roles')
        for role_obj in role_list:

            if role_obj.get('role') is None or role_obj.get('role') == '':
                continue
            
            role, created = Role.objects.get_or_create(name=role_obj.get('role').capitalize())
        
            if role_obj.get('description') is not None:
                role.description = role_obj.get('description')
            
            role.save()
            problem.roles.add(role)
        
        serializer = ProblemSerializer(problem)
        return Response(serializer.data, status=status.HTTP_200_OK)


    # add a list of subcategories to problem
    @action(detail=True, methods=['POST'])
    def subcategory(self, request, pk):

        problem = get_object_or_404(Problem, pk=pk)
        data = request.data

        
        if data.get('subcategories') is None:
            raise ValueError("subcategory list is required")
        
        subcategory_list = data.get('subcategories')

        for subcategory_obj in subcategory_list:

            if subcategory_obj.get('category') is None or subcategory_obj.get('category') == '':
                continue
            
            if subcategory_obj.get('subcategory') is None or subcategory_obj.get('subcategory') == '':
                continue
            

            category, created = Category.objects.get_or_create(name=subcategory_obj.get('category'))
        
            if subcategory_obj.get("category_description") is not None:
                category.description = subcategory_obj.get('category_description')
            category.save()

            subcategory, created = SubCategory.objects.get_or_create(name=subcategory_obj.get('subcategory'), category=category)
        
            if subcategory_obj.get("description") is not None:
                subcategory.description = subcategory_obj.get('description')
            subcategory.save()
            problem.subcategories.add(subcategory)
        
        serializer = ProblemSerializer(problem)
        
        return Response(serializer.data, status=status.HTTP_200_OK)


    ## add a list of input-output files to a problem
    @action(detail=True, methods=['POST'])
    def input_output(self, request, pk):

        
        problem = get_object_or_404(Problem, pk=pk)
        data = request.data
        
        if data.get('input_outputs') is None:
            raise ValueError("input output list is required")
        
        input_output_list = data.get('input_outputs')

        for io_obj in input_output_list:

            if io_obj.get('input') is None or io_obj.get('input') == '':
                continue
            
            elif io_obj.get('output') is None or io_obj.get('output') == '':
                continue
            

            input_output = InputOutput.objects.create(
                input=io_obj.get('input'),
                output=io_obj.get('output'),
                points = io_obj.get('points'),
                problem = problem
            )

            input_output.save()
        
        serializer = ProblemSerializer(problem)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    ## add a solution to a problem
    @action(detail=True, methods=['POST'])
    def solution(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        data = request.data

        problem.submission_count += 1
        if(data.get('status') == "Accepted"):
            problem.solve_count += 1
        
        problem.save()
        
        solution = Solution.objects.create(
            code = data.get('code'),
            language = data.get('language'),
            runtime = data.get('time'),
            memory_usage = data.get('memory'),
            solve_status = data.get('status'),
            user = request.user,
            problem = problem
        )

        serializer = SolutionSerializer(solution)
        return Response(serializer.data, status=status.HTTP_200_OK)


    ## get all solutions of a problem
    @action(detail=True, methods=['GET'])
    def solutions(self, request, pk):
        print(request.user)
        problem = get_object_or_404(Problem, pk=pk)
        solution = problem.solutions.all().filter(user=request.user).order_by('-time_added')
        serializer = SolutionSerializer(solution, many=True)
        return Response(serializer.data)


    ## get the latest solution
    @action(detail=True, methods=['GET'])
    def latest_solution(self, request, pk):
        print(request.user)
        problem = get_object_or_404(Problem, pk=pk)
        solution = problem.solutions.all().filter(user=request.user).order_by('-time_added').first()
        serializer = SolutionSerializer(solution)
        return Response(serializer.data)

    # check for bookmark
    @action(detail=True, methods=['GET'])
    def check_bookmark(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        bookmark = problem.bookmarks.all().filter(user=request.user).first()
        serializer = BookMarkSerializer(bookmark)
        return Response(serializer.data)


    ## add bookmark to a problem
    @action(detail=True, methods=['POST'])
    def bookmark(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        
        bookmark, created = BookMark.objects.get_or_create(
            user = request.user,
            problem = problem
        )

        serializer = BookMarkSerializer(bookmark)
        return Response(serializer.data, status=status.HTTP_200_OK)

    ## delete bookmark from a problem
    @action(detail=True, methods=['DELETE'])
    def delete_bookmark(self, request, pk):
        problem = get_object_or_404(Problem, pk=pk)
        
        bookmark = BookMark.objects.get(
            user = request.user,
            problem = problem
        )

        bookmark.delete()
        ret = {'message': 'bookmark deleted'}
        return Response(ret, status=status.HTTP_200_OK)
    
    
