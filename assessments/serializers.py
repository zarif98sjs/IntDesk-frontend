from sre_constants import IN
from rest_framework import serializers
from assessments.models import *
from problems.serializers import RoleSerializer, CategorySerializer
from users.serializers import UserSerializer


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """ Helper class to select fields dynamically via parameters """

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)

        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class QuestionSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'assessment_id', 'description', 'time', 'points', 'difficulty_level')

class OptionSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'
        extra_kwargs = {
            'description': {'required': True},
            'difficulty_level' : {'required': True},
            'time' : {'required': True},
        }

class QuesOptionSerializer(DynamicFieldsModelSerializer):
    options = OptionSerializer
    class Meta:
        model = QuesOption
        fields = ('option_id', 'question_id', 'is_correct')
        extra_kwargs = {
            'is_correct': {'required': True},
        }


class AssessmentSerializer(DynamicFieldsModelSerializer):

    roles = RoleSerializer(many=True)
    categories = CategorySerializer(many=True)
    # question = QuestionSerializer( many = True )

    class Meta:
        model = Assessment
        fields = '__all__'
        # fields = [
        #    'id', 'roles', 'subcategories', 'questions' , 'skill_name', 'passed_by', 'taken_by', 'image_link'
        #]
        extra_kwargs = {
            'skill_name': {'required': True},
            'image_link' : {'required': True},
        }


class UserAssessmentSerializer(DynamicFieldsModelSerializer):
    user = UserSerializer(read_only=True)
    assessment = AssessmentSerializer( read_only=True)

    class Meta:
        model = UserAssessment
        fields = '__all__'
        unique_together = (("user", "assessment"),)
        extra_kwargs = {
            'user': {'required': True},
            'assessment' : {'required': True},
        }




