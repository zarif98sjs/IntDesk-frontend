from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from discussions.models import Discussion,Comments, Upvoted, Downvoted
from discussions.serializers import DiscussionSerializer, \
     CommentSerializer, UpvotedSerializer, DownvotedSerializer
from django.shortcuts import get_object_or_404
from django.db import transaction
from rest_framework import generics


class DiscussionViewSet(viewsets.ModelViewSet):
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        data = request.data
        print(data['tags'])
        discussion = Discussion.objects.create(
            title=data['title'],
            description=data['description'],
            tags=data['tags'],
            user=request.user
        )

        serializer = DiscussionSerializer(discussion)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    ## put request to update the discussion
    @transaction.atomic
    def update(self, request, *args, **kwargs):
        data = request.data
        discussion = get_object_or_404(Discussion, pk=kwargs['pk'])
        if data.get('title') is not None : discussion.title = data['title']
        if data.get('description') is not None : discussion.description = data['description']
        if data.get('upvotes') is not None : discussion.upvotes = data['upvotes']
        if data.get('downvotes') is not None : discussion.downvotes = data['downvotes']
        if data.get('views') is not None : discussion.downvotes = data['views']
        if data.get('tags') is not None : discussion.tags = data['tags']
        discussion.save()
        serializer = DiscussionSerializer(discussion)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    ## filter all discussions by user
    @action(detail=True, methods=['get'])
    def myq(self, request,pk=None):
        queryset = Discussion.objects.filter(user=request.user)
        serializer = DiscussionSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    ## get all comments of a discussion
    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        discussion = get_object_or_404(Discussion, pk=pk)
        comments = discussion.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    ## get a single comment of a discussion, pass extra parameter (comment_id) in action
    ## note that, the id doesn't start from 1 for a specific discussion
    ## the comments have global id, not specific to a discussion
    @action(detail=True, methods=['get'], url_path='comment_id/(?P<comment_id>[0-9]+)')
    def comment_id(self, request, comment_id, pk=None):
        discussion = get_object_or_404(Discussion, pk=pk)
        comment = discussion.comments.get(pk=comment_id)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)


    ## create a new comment for a discussion
    ## parent is null for main comments, and not null denotes a reply
    @action(detail=True, methods=['POST'])
    def comment(self,request,pk):
        discussion = get_object_or_404(Discussion,pk=pk)
        data = request.data

        if data.get('comment') is None:
            raise ValueError("Comment is required")
        elif data.get('hash') is None:
            raise ValueError("Hash is required")
        else:
            comment_ = Comments.objects.create(
                comment = data.get('comment'),
                hash = data.get('hash'),
                discussion_id = discussion.id,
                user = request.user,
                parent = data.get('parent'),
                upvotes = 0,
                downvotes = 0
            )

        serializer = CommentSerializer(comment_)
        return Response(serializer.data, status=status.HTTP_200_OK)

    ## mark discussion upvoted by a user
    @action(detail=True, methods=['POST'])
    def upvoted(self, request,pk=None):
        discussion = get_object_or_404(Discussion,pk=pk)

        ## check if already upvoted
        if Upvoted.objects.filter(discussion=discussion, user=request.user).exists():
            raise ValueError("Already upvoted")
        else:
            upvoted = Upvoted.objects.create(
                user = request.user,
                discussion = discussion
                )

        serializer = UpvotedSerializer(upvoted)
        return Response(serializer.data, status=status.HTTP_200_OK)

    ## mark discussion downvoted by a user
    @action(detail=True, methods=['POST'])
    def downvoted(self, request,pk=None):
        discussion = get_object_or_404(Discussion,pk=pk)

        ## check if already downvoted
        if Downvoted.objects.filter(discussion=discussion, user=request.user).exists():
            raise ValueError("Already downvoted")
        else:
            downvoted = Downvoted.objects.create(
                user = request.user,
                discussion = discussion
                )

        serializer = DownvotedSerializer(downvoted)
        return Response(serializer.data, status=status.HTTP_200_OK)

    ## query if a discussion is upvoted by a user
    @action(detail=True, methods=['GET'])
    def check_vote_status(self, request,pk=None):
        discussion = get_object_or_404(Discussion,pk=pk)
        ret = {}
        isupvoted = Upvoted.objects.filter(discussion=discussion, user=request.user).exists()
        isdownvoted = Downvoted.objects.filter(discussion=discussion, user=request.user).exists()
        ret = {'isupvoted': isupvoted, 'isdownvoted': isdownvoted}
        return Response(ret, status=status.HTTP_200_OK)

    ## delete from upvoted table
    @action(detail=True, methods=['DELETE'])
    def delete_upvoted(self, request,pk=None):
        discussion = get_object_or_404(Discussion,pk=pk)
        upvoted = Upvoted.objects.filter(discussion=discussion, user=request.user)
        upvoted.delete()
        ret = {'message': 'upvote deleted'}
        return Response(ret,status=status.HTTP_200_OK)

    ## delete from downvoted table
    @action(detail=True, methods=['DELETE'])
    def delete_downvoted(self, request,pk=None):
        discussion = get_object_or_404(Discussion,pk=pk)
        downvoted = Downvoted.objects.filter(discussion=discussion, user=request.user)
        downvoted.delete()
        ret = {'message': 'downvote deleted'}
        return Response(ret,status=status.HTTP_200_OK)

    


class DiscussionMineList(generics.ListAPIView):
    serializer_class = DiscussionSerializer

    def get_queryset(self):
        return Discussion.objects.filter(user=self.request.user)