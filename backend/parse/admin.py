from django.contrib import admin
from .models import Resume

class ResumeAdmin(admin.ModelAdmin):
    list_display = ('title', 'file')

# Register your models here.

admin.site.register(Resume, ResumeAdmin)
# Register your models here.
