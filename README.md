# kitty

Windows of the kitty terminal, opened, read and typed into from Tuatara.

A kitty window here is one of a kitty that Tuatara starts itself, never your
own kitty: drawn by the graphics card, with kitty's ligatures and pictures.
Tuatara talks to it over a socket of its own in your runtime folder (else in a folder only you may enter), and only
there. Remote control is allowed over that socket alone
(`allow_remote_control socket-only`, given on kitty's command line, which no
configuration file can undo), so a program run in the window, or a file shown
in it, cannot steer it.

## Loading it, step by step

1. **Install what it needs.** The kitty terminal:

   | System | Command |
   |---|---|
   | Fedora | `sudo dnf install kitty` |
   | Ubuntu, Debian | `sudo apt install kitty` |
   | Arch, Omarchy | `sudo pacman -S kitty` |

2. **Open your init file**: in Tuatara press `C-x C-f`, type
   `~/.config/tuatara/init.lisp` and press `RET`.
3. **Add these lines** to it (the first line only once, whichever of the
   project's packages you load):

   ```lisp
   (load-package "kitty" :source "https://github.com/Tuatara-Editor/tuatara-kitty")
   ```

4. **Save** with `C-x C-s`, **quit** with `C-x C-c`, and **start Tuatara
   again**. Answer `y` when it asks whether to load kitty; it asks once.
5. **Check it**: `M-x kitty` opens a kitty window.


## Commands

| Command | What it does |
|---|---|
| `M-x kitty` | Opens a kitty window in the current buffer's folder, with your shell; beside the editor's window when Tuatara itself runs in such a kitty. |
| `M-x kitty-text` | Brings all the text of a kitty window, scrollback too, into a buffer with its colours, to move through, select, search and copy. `r` there reads it again. |
| `M-x kitty-input` | Types the selection into a kitty window, or without one the current line and a return, so that the shell runs it. |

With several windows open, the last two ask which one.

## Tuatara in a kitty of its own

```sh
./tuatara-kitty [--program KITTY] [FILE...]
```

runs Tuatara in a kitty of its own, editing the files given, with `M-x kitty`
opening windows beside the editor's. The editor run is `$TUATARA`, else `tuatara`
on the `PATH`.

## Its looks

Your own `kitty.conf`, then `~/.config/tuatara/kitty.conf` over it, made the
first time with examples only.

## Settings

| Setting | Standard | What it is |
|---|---|---|
| `*kitty-program*` | `"kitty"` | The kitty program windows are opened with. Set it after the package is loaded, in its `:config`. |

## Safety

A window runs only what you type there. A program you run in it runs as you,
and like any such program may reach the socket; what a window only shows (a
file's escape sequences) cannot.

## Tests

`tools/test.sh` runs them.

## Credits

kitty is by Kovid Goyal; this package drives it by its remote control.

## License

GPL-3.0-or-later; see `LICENSE` at the top of this repository.

## Working on it

```sh
tools/test.sh
```

runs its tests against a Tuatara source tree: `../tuatara` beside this
repository, or `../../tuatara` beside the folder it is in, unless
`TUATARA_SOURCE` names another. How a package is laid out and which of
Tuatara's names it may use are in Tuatara's
[HACKING.org](https://github.com/Tuatara-Editor/tuatara/blob/main/HACKING.org);
bug reports, ideas and how changes are made in
[CONTRIBUTING.md](CONTRIBUTING.md).
