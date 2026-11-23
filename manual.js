window.tuataraManualText = {"01-what-kitty-is":" what kitty is a package that opens windows of the kitty terminal from tuatara, reads their text into a buffer and types into them. kitty is a terminal drawn by the graphics card, with ligatures and pictures. this package opens its windows from the editor. a window here belongs to a kitty that tuatara starts itself, never your own kitty. the editor steers it over a socket of its own, and only over that socket. it is a package, not part of the editor. kitty itself is by kovid goyal. the package drives it by its remote control.","01-what-kitty-is#how-it-fits-together":"1.1 how it fits together tuatara starts a kitty with a socket of its own in your runtime directory. where you have none, the socket is in a directory of tuatara's cache that only you may enter. tuatara sends its commands to that socket with kitten , kitty's own command line tool, which has been part of kitty since 0.28. three commands do the work: m-x kitty opens a window; m-x kitty-text brings a window's text into a buffer; m-x kitty-input types a line or the selection into a window.","01-what-kitty-is#what-this-manual-covers":"1.2 what this manual covers chapter 2 is the use of the three commands. chapter 3 is about running tuatara itself in a kitty of its own, and how to set the looks of the windows. chapter 4 says what keeps a program in a window from steering kitty, and lists the setting and the limits. chapter 5 lists every command and setting.","02-opening-reading-and-typing":" opening, reading and typing into a window open a kitty window, read its text, and type into it.","02-opening-reading-and-typing#opening-a-window":"2.1 opening a window m-x kitty opens a kitty window in the current buffer's directory, running your shell. how it opens depends on where tuatara runs: when tuatara runs in a kitty of its own (chapter 3), the window opens beside the editor's, as a vertical split; when a kitty of tuatara's is already open, the window is a new window of that kitty; otherwise tuatara starts a kitty with its first window in the directory, and waits for it to answer, at most 5 seconds. when there is no kitty or no kitten program, the command says which one is missing and how to install it. modal non-modal command what it does none m-x kitty kitty open a kitty window in the current buffer's directory: a window of a kitty the editor starts itself, with your shell (beside the editor's window when the editor runs in such a kitty, started with kitty/tuatara-kitty).","02-opening-reading-and-typing#reading-a-window":"2.2 reading a window m-x kitty-text brings all the text of a kitty window, the scrollback too, into a buffer called *kitty: title* , with its colours. you can move through it, select, search and copy as in any text. point starts at the end, where the window's last line is. press r there to read the window again. if the window has closed since, the buffer says so. modal non-modal command what it does none m-x kitty-text kitty-text bring the text of a kitty window the editor opened (m-x kitty) into a buffer, all of it, the scrollback too, with its colours: to move through, select, search and copy as any text.","02-opening-reading-and-typing#typing-into-a-window":"2.3 typing into a window m-x kitty-input types the selection into a window. without a selection, it types the line point is on, and a return, so that the shell runs it. the text is sent as a paste (bracketed paste, where the program in the window asks for it), so that the lines of a selection are not run one by one. a line is followed by a return of its own. modal non-modal command what it does none m-x kitty-input kitty-input type into a kitty window the editor opened (m-x kitty) the selection, or without one the line point is on and a return, so that the shell runs it.","02-opening-reading-and-typing#several-windows":"2.4 several windows with several windows open, kitty-text and kitty-input ask which one. the window used last is offered first, and each is listed with its title and its directory. tuatara's own window, when the editor runs in a kitty, is left out of the list. with only one window, it is used without asking. if no window of tuatara's is open, the two commands say that, and that m-x kitty opens one.","03-tuatara-in-a-kitty-of-its-own":" tuatara in a kitty of its own, and its looks run the editor itself in a kitty, and set how the windows look.","03-tuatara-in-a-kitty-of-its-own#the-launcher":"3.1 the launcher the package has a program, tuatara-kitty , in its directory: ./tuatara-kitty [--program kitty] [file...] it runs tuatara in a kitty of its own, editing the files given, and returns at once. the kitty draws the editor with its own drawing, ligatures and pictures. m-x kitty there opens windows beside the editor's. the editor it runs is the program named by $tuatara , else tuatara on the path . --program names the kitty program to use, when it is not kitty on the path . the socket is in your runtime directory, else in a new directory that only you may enter. the launcher has two more forms, which m-x kitty and the tests use: --hidden starts the kitty unseen; --shell directory socket starts your shell in a kitty in that directory, listening on that socket.","03-tuatara-in-a-kitty-of-its-own#its-looks":"3.2 its looks a kitty of tuatara's reads your own kitty.conf first, then ~/.config/tuatara/kitty.conf over it. a kitty.conf in the directory named by xdg_config_home is used in place of ~/.config when that is set. the launcher makes ~/.config/tuatara/kitty.conf the first time, with examples only, each commented out. any kitty setting can be put there. it applies to the windows tuatara opens, and not to your own kitty: # font_size 12 # background_opacity 0.95 # remember_window_size no # initial_window_width 100c remote control is not set in either file. tuatara sets it on kitty's command line, and nothing in a configuration file can undo it (chapter 4).","04-safety-settings-and-limits":" safety, settings and limits what keeps a window from steering kitty, the one setting, and what the package does not do.","04-safety-settings-and-limits#safety":"4.1 safety kitty is told what to do over a socket. tuatara gives remote control over that socket alone ( allow_remote_control socket-only ), on kitty's command line. no configuration file can undo that. a program run in the window, or a file shown in it, cannot steer kitty over the terminal. tuatara counts a socket as its own only when it is named tuatara-kitty- and something, is a socket and not a link, and is in your runtime directory or in the kitty directory of tuatara's cache. nobody else can put one there. a window runs only what you type there. a program you run in it runs as you, and like any such program it may reach the socket. what a window only shows, such as a file's escape sequences, cannot. kitty-input refuses text it cannot type as shown. a selection or a line with a control character in it, other than a tab or a newline, is not sent. that covers a carriage return, escape and delete, and the codes from 128 to 159. such a character could make the shell run something other than the text you see.","04-safety-settings-and-limits#the-setting":"4.2 the setting set it in the package's :config in your init file, after the package is loaded: (load-package \"kitty\" :source \"https://github.com/tuatara-editor/tuatara-kitty\" :config (setf *kitty-program* \"~/.local/kitty.app/bin/kitty\")) setting default values what it changes *kitty-program* \"kitty\" text the kitty program m-x kitty opens windows of. the editor has a setting of its own with kitty in its name, *kitty-keyboard* . it says whether tuatara's terminal frontend reads keys by kitty's keyboard protocol, and is for the editor running in any terminal. it does not need this package and is described in tuatara's manual.","04-safety-settings-and-limits#limits":"4.3 limits a request to kitty is given up after 5 seconds. while tuatara waits, it keeps reading keys, and c-g gives up at once. only windows of a kitty that tuatara started are used, never those of your own kitty. kitten must be there, from kitty 0.28 or later.","05-every-command-and-setting":" every command and setting each command and setting of kitty, to look one up by name. the tables are made from the program each time this manual is made, so they never list a command or setting that kitty does not have. the first table has four columns. the first two are keys: the modal keys, which work only with modal editing on, and the non-modal keys, which work with it off too. a command with no key says m-x and its name in the second column, because you can only run it by its name. the third column is the name of the command and the fourth says what it does. to run a command by its name, press m-x , type a few letters of the name and press ret . to find a command from within the editor, press c-h f . to find the command that a key runs, press c-h k and then the key. the editor's own settings and commands are in chapters 21 and 22 of its manual.","05-every-command-and-setting#every-command":"5.1 every command modal non-modal command what it does none m-x kitty kitty open a kitty window in the current buffer's directory: a window of a kitty the editor starts itself, with your shell (beside the editor's window when the editor runs in such a kitty, started with kitty/tuatara-kitty). none m-x kitty-input kitty-input type into a kitty window the editor opened (m-x kitty) the selection, or without one the line point is on and a return, so that the shell runs it. none m-x kitty-text kitty-text bring the text of a kitty window the editor opened (m-x kitty) into a buffer, all of it, the scrollback too, with its colours: to move through, select, search and copy as any text.","05-every-command-and-setting#every-setting":"5.2 every setting setting default values what it changes *kitty-keyboard* :auto :auto, t, nil whether the terminal frontend reads keys by the kitty keyboard protocol. *kitty-program* \"kitty\" text the kitty program m-x kitty opens windows of."};
// The manual's pages: filter the contents column to the headings whose title or
// text holds what is typed in its box, and change between light and dark
// colours (the choice kept in this browser for the next page). The entry for
// the part being read is marked as the page scrolls. The text of
// every section comes before this script, in window.tuataraManualText, made
// when the manual is built. Links are left alone. No address is ever loaded.
(function () {
  var root = document.documentElement;
  var key = "tuatara-manual-theme";
  var saved = null;
  try { saved = window.localStorage.getItem(key); } catch (e) { saved = null; }
  if (saved === "light" || saved === "dark") { root.setAttribute("data-theme", saved); }

  function dark() {
    var chosen = root.getAttribute("data-theme");
    if (chosen) { return chosen === "dark"; }
    return Boolean(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  var button = document.querySelector("button.theme");
  if (button) {
    var label = function () {
      button.textContent = dark() ? "Light" : "Dark";
      button.setAttribute("aria-label", dark() ? "Use light colours" : "Use dark colours");
    };
    button.hidden = false;
    label();
    button.addEventListener("click", function () {
      var next = dark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { window.localStorage.setItem(key, next); } catch (e) { /* kept for this page only */ }
      label();
    });
  }

  var nav = document.querySelector("nav.toc");
  var box = nav && nav.querySelector("input");
  if (!box) { return; }
  var texts = window.tuataraManualText || {};

  // The key of a section in the text: a chapter's page name without its
  // ending, then # and the heading's id. On the page of every chapter the
  // links are "10-directories.html#marks", on the whole manual "#10-directories--marks".
  function keyOf(href) {
    var parts = /^#?([0-9]+-[^#.]*?)(?:\.html)?(?:(?:#|--)(.*))?$/.exec(href || "");
    if (!parts) { return null; }
    return parts[2] ? parts[1] + "#" + parts[2] : parts[1];
  }

  // Show ITEM when its title or text holds WORDS, or any entry under it does.
  function show(item, words) {
    var link = item.querySelector(":scope > a");
    var title = link ? link.textContent.toLowerCase() : "";
    var text = (link && texts[keyOf(link.getAttribute("href"))]) || "";
    var hit = words === "" || title.indexOf(words) !== -1 || text.indexOf(words) !== -1;
    item.querySelectorAll(":scope > ol > li").forEach(function (inner) {
      if (show(inner, words)) { hit = true; }
    });
    item.classList.toggle("hidden", !hit);
    return hit;
  }

  box.addEventListener("input", function () {
    var words = box.value.trim().toLowerCase().replace(/\s+/g, " ");
    nav.classList.toggle("filtering", words !== "");
    nav.querySelectorAll("ol.chapters > li").forEach(function (item) { show(item, words); });
  });

  // The entry of the column for the part being read is marked, following as
  // the page is scrolled: the last heading that has reached the middle of
  // the window, and the entries it is under, so a section folded out of sight
  // leaves the section holding it marked. On the whole manual, where no chapter is marked as the one
  // shown, its chapter is unfolded too.
  var whole = !nav.querySelector("li.here");
  var here = location.pathname;
  var marks = [];
  nav.querySelectorAll("ol.chapters a").forEach(function (link) {
    var url = new URL(link.href, location.href);
    if (url.pathname !== here) { return; }
    var target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1)))
                          : document.querySelector("main h1");
    if (target) { marks.push({ link: link, target: target, top: 0 }); }
  });
  if (marks.length === 0) { return; }
  var marked = null;

  function measure() {
    marks.forEach(function (mark) { mark.top = mark.target.getBoundingClientRect().top + window.scrollY; });
    marks.sort(function (a, b) { return a.top - b.top; });
  }

  // Mark or unmark the entry of MARK and every entry it is under.
  function light(mark, on) {
    for (var item = mark.link.closest("li"); item && nav.contains(item); item = item.parentElement.closest("li")) {
      item.querySelector(":scope > a").classList.toggle("in-view", on);
    }
  }

  // Keep LINK in view in whichever part of the column scrolls.
  function reveal(link) {
    [nav, nav.querySelector("ol.chapters")].forEach(function (box) {
      if (!box || box.scrollHeight <= box.clientHeight) { return; }
      var outer = box.getBoundingClientRect();
      var inner = link.getBoundingClientRect();
      if (inner.top < outer.top) { box.scrollTop -= outer.top - inner.top + 24; }
      else if (inner.bottom > outer.bottom) { box.scrollTop += inner.bottom - outer.bottom + 24; }
    });
  }

  // Mark the entry of the last heading at or above the middle of the
  // window, the first when none is: a search in the measured places, the
  // page changed only when the entry is another.
  function follow() {
    var line = window.scrollY + window.innerHeight / 2;
    var low = 0, high = marks.length - 1, found = marks[0];
    while (low <= high) {
      var middle = (low + high) >> 1;
      if (marks[middle].top <= line) { found = marks[middle]; low = middle + 1; } else { high = middle - 1; }
    }
    if (found === marked) { return; }
    if (marked) { light(marked, false); }
    marked = found;
    light(marked, true);
    if (whole) {
      var chapter = marked.link.closest("ol.chapters > li");
      nav.querySelectorAll("ol.chapters > li.here").forEach(function (item) {
        if (item !== chapter) { item.classList.remove("here"); }
      });
      if (chapter) { chapter.classList.add("here"); }
    }
    reveal(marked.link);
  }

  // Measure again when pictures have loaded or the window changed size.
  function again() {
    measure();
    if (marked) { light(marked, false); }
    marked = null;
    follow();
  }

  measure();
  follow();
  window.addEventListener("scroll", follow, { passive: true });
  window.addEventListener("resize", again);
  window.addEventListener("load", again);
}());
