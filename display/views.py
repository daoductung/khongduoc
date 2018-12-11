from django.core.files.storage import FileSystemStorage
from django.shortcuts import render, redirect
from django.views.generic import TemplateView, View

from display.models import Dispaly


class DisplayChatbotView(TemplateView):
    template_name = "chatbot.html"


class DisplayView(View):
    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        ds_cot = Dispaly.objects.all().order_by('id')

        context = {
            'ds_cot': ds_cot
        }
        return render(request, self.template_name, context)


class ColumnView(TemplateView):
    template_name = "admin/index.html"


class ColumnAdminView(View):
    template_name = "admin/columnTraffic/index.html"

    def get(self, request, *args, **kwargs):
        ds_cot = Dispaly.objects.all().order_by('id')

        context = {
            'ds_cot': ds_cot
        }
        return render(request, self.template_name, context)


class ColumnAddView(View):
    template_name = "admin/columnTraffic/add.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        data = request.POST
        file = request.FILES['image']
        display = Dispaly()
        if request.FILES.get('image', None):
            display.image = file

        display.name = data['name']
        display.state = data['state']
        display.time = data['time']
        display.save()

        return redirect('/admin/columntraffic')


class ColumnEditView(View):
    template_name = "admin/columnTraffic/edit.html"

    def get(self, request, *args, **kwargs):
        column_id = kwargs['cot_id']
        display = Dispaly.objects.get(id=column_id)
        context = {
            'display': display
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        column_id = kwargs['cot_id']
        display = Dispaly.objects.get(id=column_id)
        if display:
            data = request.POST
            display.name = data['name']
            display.state = data['state']
            display.time = data['time']
            if request.FILES.get('image', None):
                file = request.FILES['image']
                display.image = file
            display.save()

        return redirect('/admin/columntraffic')


class ColumnDeleteView(View):

    def get(self, request, *args, **kwargs):
        column_id = kwargs['cot_id']
        display = Dispaly.objects.get(id=column_id)
        if display:
            display.delete()

        return redirect('/admin/columntraffic')
