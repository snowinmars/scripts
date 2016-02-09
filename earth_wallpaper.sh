# This script get images from himawari8 sputnik, combine it with imagemagick and set result as wallpaper.
# ./earthwallpaper <resolution> <xsystem>
# <resolution> can be 4, 8, 16 or 20 : bigger number - better resolution
# <xsystem> can be xfce4 or gnome. Default is xfce4
# Deps: imagemagick wget
# github: https://github.com/snowinmars/scripts/blob/master/earth_wallpaper.sh

#!/bin/bash

delay=900 # seconds

while true
do
	width=550
	numblocks=${1:-4}
	xsystem=${2:-xfce4}
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

	case $xsystem in
		"xfce4") 
			xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitorVGA-0/workspace0/last-image -s $workdir/out_$numblocks.png 
		;;
		"gnome")
			gconftool-2 -t str -s /desktop/gnome/background/picture_filename $workdir/out_$numblocks.png
		;;
		*)
			echo Unknown graphical system, can\'t set wallpaper. You can do it manually from $workdir
		;;
	esac

	echo Done, waiting $(delay) seconds
	sleep $delay
done