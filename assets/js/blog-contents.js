/* Build the blog outline from rendered headings, including future posts. */
(function () {
  "use strict";
  var sidebar = document.querySelector(".blog-contents");
  var content = document.querySelector(".page__content") || document.querySelector(".archive");
  if (!sidebar || !content) return;
  var headings = Array.prototype.slice.call(content.querySelectorAll(
    content.classList.contains("archive") ? "h2.archive__subtitle" : "h2, h3"
  ));
  // A post can name its untitled opening in the outline via contents_intro.
  var introLabel = sidebar.getAttribute("data-intro-label");
  var intro = introLabel && !content.classList.contains("archive") ? content.firstElementChild : null;
  if (intro && headings.indexOf(intro) === -1) {
    if (!intro.id) {
      var introId = "introduction";
      while (document.getElementById(introId)) introId += "-intro";
      intro.id = introId;
    }
    intro.style.scrollMarginTop = "2em";
    headings.unshift(intro);
  }
  var list = sidebar.querySelector("ol");
  var panel = sidebar.querySelector("details");
  var desktop = window.matchMedia("(min-width: 57.8125em)");
  var links = [];
  var nested;
  headings.forEach(function (heading, index) {
    if (!heading.id) {
      var id = "section-" + (index + 1);
      while (document.getElementById(id)) id += "-section";
      heading.id = id;
    }
    var item = document.createElement("li");
    var link = document.createElement("a");
    link.href = "#" + encodeURIComponent(heading.id);
    link.textContent = heading === intro ? introLabel : heading.textContent;
    item.appendChild(link);
    if (heading.tagName === "H3" && list.lastElementChild) {
      if (!nested) {
        nested = document.createElement("ol");
        list.lastElementChild.appendChild(nested);
      }
      nested.appendChild(item);
    } else {
      list.appendChild(item);
      nested = null;
    }
    links.push(link);
    link.addEventListener("click", function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      // Keep the theme's legacy smooth-scroll handler from overriding this jump.
      event.stopImmediatePropagation();
      if (!desktop.matches) panel.open = false;
      // Allow keyboard and screen-reader users to continue at the destination.
      heading.setAttribute("tabindex", "-1");
      heading.scrollIntoView({ block: "start" });
      heading.focus({ preventScroll: true });
      window.history.pushState(null, "", link.getAttribute("href"));
    });
  });
  if (!headings.length) {
    sidebar.hidden = true;
    return;
  }
  function setPanel() { panel.open = desktop.matches; }
  setPanel();
  if (desktop.addEventListener) desktop.addEventListener("change", setPanel);
  else desktop.addListener(setPanel);
  var active = -1;
  var scheduled = false;
  function update() {
    scheduled = false;
    var current = 0;
    headings.forEach(function (heading, index) {
      if (heading.getBoundingClientRect().top <= 100) current = index;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = headings.length - 1;
    }
    if (current === active) return;
    active = current;
    links.forEach(function (link, index) {
      link.classList.toggle("is-past", index < current);
      if (index === current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    // Keep the active entry visible inside a long desktop outline.
    if (desktop.matches) {
      var nav = sidebar.querySelector("nav");
      var entry = links[current].getBoundingClientRect();
      var bounds = nav.getBoundingClientRect();
      if (entry.top < bounds.top) nav.scrollTop += entry.top - bounds.top;
      else if (entry.bottom > bounds.bottom) nav.scrollTop += entry.bottom - bounds.bottom;
    }
  }
  function queueUpdate() {
    if (!scheduled) { scheduled = true; window.requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  window.addEventListener("load", queueUpdate);
  if (window.ResizeObserver) new ResizeObserver(queueUpdate).observe(content);
  update();
}());
