function prompt {
    "" + [char]0x001b + "[0;1m" + $pwd + " > " + [char]0x001b + "[0m"
}
