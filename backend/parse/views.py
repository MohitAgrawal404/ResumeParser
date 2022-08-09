from django.shortcuts import render
import logging
from .models import Resume
from rest_framework import viewsets
from .serializers import ResumeSerializer
import PyPDF2
import re

# Create your views here.

logger = logging.getLogger(__name__)

class ResumeView(viewsets.ModelViewSet): 
    serializer_class = ResumeSerializer
    
    def get_queryset(self):
        if self.request.method == 'POST':
            p = Resume.objects.create(self.request.POST)
        queryset = Resume.objects.all()
        if len(self.request.GET.keys()) == 0:
            return queryset
        
        check = self.request.GET.get("q", None)
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
                if re.search(check,Text):
                    set.append(x.id)
                    break

        queryset = Resume.objects.filter(id__in=set)
        return queryset

