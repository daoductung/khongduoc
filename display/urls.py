from django.urls import path

from display import views

urlpatterns = [
    path('', views.DisplayView.as_view()),
    path('chatbot/', views.DisplayChatbotView.as_view()),
    path('admin', views.ColumnView.as_view()),
    path('admin/columntraffic', views.ColumnAdminView.as_view()),
    path('admin/columntraffic/add', views.ColumnAddView.as_view()),
    path('admin/columntraffic/edit/<int:cot_id>', views.ColumnEditView.as_view()),
    path('admin/columntraffic/delete/<int:cot_id>', views.ColumnDeleteView.as_view()),
]