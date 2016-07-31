---
layout: page
title: Friends
permalink: /friends/
---

<div class="row friends">
  {% for friend in site.data.friends %}
    <div class="card">
      <img src="{{ friend.image }}" alt="{{ friend.name }}">
      <h4>
        {{ friend.name }}
      </h4>
      <p class="card-text">{{ friend.description }}</p>
    </div>
  {% endfor %}
</div>
