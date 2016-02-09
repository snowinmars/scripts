#!/bin/bash

delay=900 # seconds

while true
do
	width=550
	numblocks=${1:-4}
	level=$numblocks'd' #Level can be 4d, 8d, 16d, 20d
	
	timestamp=$(date -d -1day +%Y/%m/%d/%H%M | sed -r 's/.$/000/')
	
	username=$(getent passwd $UID | sed -e 's/\:.*//')
	workdir="/home/"$username"/.earthwallpaper"

	if [ ! -d $workdir ]; then
		mkdir -p $workdir
	fi

	cd $workdir

	site="http://himawari8-dl.nict.go.jp/himawari8/img/D531106"

	url="$site/$level/$width/$timestamp"

		for (( i=0; i<=$numblocks-1; ++i))
		do
		    for (( j=0; j<=$numblocks-1; ++j))
			do
				sourceurl="$url"$(printf '_%d_%d.png' "$i" "$j")
				#sourceurl="$url$dash$i$dash$j.png"
				#desturl="$url$dash"
				desturl="piece_"$numblocks"_"$(printf '%02d_%02d.png' "$i" "$j")
				echo Downloading $sourceurl to $desturl
			    wget $sourceurl -O $workdir/$desturl
			done
			convert -append piece_$numblocks*_*.png img_$numblocks"_"$(printf '%02d' "$i").png
			rm piece_$numblocks*_*.png
		done
	convert +append img_$numblocks"_"*.png "out_"$numblocks".png"
	rm img_$numblocks"_"*.png

	xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitorVGA-0/workspace0/last-image -s $workdir/out_$numblocks.png 

	sleep $delay
done