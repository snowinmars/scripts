total=$(cat /proc/meminfo | grep MemTotal | tr -s " " | cut -d " " -f2)
free=$(cat /proc/meminfo | grep MemFree | tr -s " " | cut -d " " -f2)
memUsage=$(echo "100 * ($total - $free) / $total" | bc)

if [[ $memUsage -gt 97 ]] ; then
	printf "<txt><span foreground='#c33'>$memUsage</span></txt>"
elif [[ $memUsage -gt 90 ]] ; then
	printf "<txt><span foreground='#cc3'>$memUsage</span></txt>"
else
	printf "<txt><span foreground='#ccc'>$memUsage</span></txt>"
fi
