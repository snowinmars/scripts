#!/bin/bash

delay=900 # seconds

while true
do

	width=550
	level='4d' #Level can be 4d, 8d, 16d, 20d 
	numblocks=4 #this apparently corresponds directly with the level, keep this exactly the same as level without the 'd'

	nowtime=$(date +%H%M | sed -r 's/.$//')
	nowtime=$nowtime"000"
	nowyear=$(date +%Y)
	nowmonth=$(date +%m)
	nowday=$(date +%d -d -1day)

	workdir="/home/cutemaj/.earthwallpaper"

	if [ ! -d $workdir ]; then
		mkdir -p $workdir
	fi

	cd $workdir

	outfile="latest.jpg" 

	site="http://himawari8-dl.nict.go.jp/himawari8/img/D531106"

	url="$site/$level/$width/$nowyear/$nowmonth/$nowday/$nowtime"
	dash="_"

		for (( i=0; i<=$numblocks-1; ++i))
		do
		    for (( j=0; j<=$numblocks-1; ++j))
			do
				partialimageurl="$url$dash$i$dash$j.png"
				echo Downloading from $partialimageurl to $workdir
			    wget $partialimageurl -P $workdir
			done
			convert -append *_*_*.png img_$i.png
			rm *_*_*.png
		done
	convert +append img_*.png out.png
	rm img_*.png

	xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitorVGA-0/workspace0/last-image -s $workdir/out.png 

	sleep $delay
done
