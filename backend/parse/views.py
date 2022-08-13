from django.shortcuts import render
import logging
from .models import Resume
from rest_framework import viewsets
from .serializers import ResumeSerializer
import PyPDF2
import re
from pyresparser import ResumeParser
import logging
logger = logging.getLogger('__name__')
import json
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class ResumeView(viewsets.ModelViewSet): 
    serializer_class = ResumeSerializer
    
    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)        
        serializer.is_valid(raise_exception=True)

        # Here all incoming data we kept in serializer variable.
        # Change the data in your way and then pass it inside perform_create()

        self.perform_create(serializer)
        d = serializer.data['id']
        dee = Resume.objects.get(id=d)
        dee.info = ResumeParser(dee.file.path).get_extracted_data()
        dee.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
           data={
               "status": 201,
               "message": "Product Successfully Created",                
               "data": serializer.data,                
               },
               status=status.HTTP_201_CREATED,
               headers=headers
           )


    def get_queryset(self):
        queryset = Resume.objects.all()
        if len(self.request.GET.keys()) == 0:
            return queryset
        
        check = self.request.GET.get("q", None)
        check2 = self.request.GET.get("f1", None)
        if check2 == "Language Filter":
            check2 = ""

        set = []
        for x in queryset:
            #path = open(x.file, "rb")
            object = PyPDF2.PdfFileReader(x.file)

            # Get number of pages
            NumPages = object.getNumPages()
            
            # Extract text and do the search
            for i in range(0, NumPages):
                PageObj = object.getPage(i)
                Text = PageObj.extractText()
                if re.search(check,Text) and re.search(check2,Text):
                    set.append(x.id)
                    break

        queryset = Resume.objects.filter(id__in=set)
        return queryset

