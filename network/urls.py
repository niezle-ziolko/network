from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("tweet", views.tweet, name="tweet"),
    path("profile/<int:user_id>", views.profile, name="profile"),
    path("all-posts", views.allPosts, name="allPosts"),
    path("following", views.following, name="following"),

    # API routes
    path("follow/<int:user_id>", views.follow, name="follow"),
    path("edit/<int:post_id>", views.edit, name="edit"),
    path('delete/<int:post_id>/', views.delete_post, name='delete_post'),
    path("like/<int:post_id>", views.like, name="like"),
]