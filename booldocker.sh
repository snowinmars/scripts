docker_state=$(docker info >/dev/null 2>&1)
rc=$?

if [[ $rc -eq 0 ]] ; then
	echo "ok"
else
	echo "DEADBEAF"
fi
