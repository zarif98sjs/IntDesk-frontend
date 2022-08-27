from rest_framework import serializers
from discussions.models import Discussion, Comments, Upvoted, Downvoted
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

class CommentSerializer(DynamicFieldsModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Comments
        fields = ('id','discussion_id', 'comment', 'parent', 'created_at', 'updated_at','user','hash')
        read_only_fields = ('created_at', 'updated_at')
        extra_kwargs = {
            'comment': {'required': True},
            'hash' : {'required': True},
        }

class DiscussionSerializer(DynamicFieldsModelSerializer):
    user = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True, fields=('id', 'comment', 'parent', 'created_at', 'updated_at'))
    tags = serializers.ListField(child=serializers.CharField(max_length=100))
    class Meta:
        model = Discussion
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'upvotes', 'downvotes', 'views', 'comment_count')
        extra_kwargs = {
            'title': {'required': True},
            'description': {'required': True},
        }

class UpvotedSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Upvoted
        fields = ('id','user_id', 'discussion_id')
        extra_kwargs = {
            'user': {'required': True},
        }

class DownvotedSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Downvoted
        fields = ('id','user_id', 'discussion_id')
        extra_kwargs = {
            'user': {'required': True},
        }


