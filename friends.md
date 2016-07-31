---
layout: page
title: Friends
permalink: /friends/
---

<div class="row friends">
  {% for friend in site.data.friends %}
    <div class="card col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 card-block">
      <img src="{{ friend.image }}" alt="{{ friend.name }}">
      <h4>
        {{ friend.name }}
      </h4>
      <p class="card-text">{{ friend.bio }}</p>
    </div>
  {% endfor %}
</div>
