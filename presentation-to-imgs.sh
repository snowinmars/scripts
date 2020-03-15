#!/usr/bin/env bash

# converts a presentation to pdf and screenshots

# requires:
#	libreoffice
#	imagemagick

# usage:
#	presentation-to-imgs.sh [presentation]

input=$1

filename=$(basename -- "$input")
filename="${filename%.*}"
#extension="${filename##*.}"
dir=$(dirname "$input")
cd $dir

libreoffice --headless --convert-to pdf $input

img_dir = "$dir/$filename_imgs"

mkdir -p $img_dir
convert -density 300 -trim "$dir/$filename.pdf" -quality 100 "$img_dir/%d.jpg"