set -e


echo 'To allow you to view aur changes, the script have to download aur PKGBUILDs.'
echo 'No changes will be applied to the current system.'
read -p "Continue (y/n)?" choice
case "$choice" in 
  y|Y ) echo ;;
  n|N ) exit 0 ;;
  * ) echo ;;
esac


packageNames=($(pacman -Qm | cut -d " " -f1))
packageVersions=($(pacman -Qm | cut -d " " -f2))

rm -r ./aur/* || true
mkdir -p ./aur
cd ./aur

for i in `seq 1 ${#packageNames[@]}` ;
do
	name=${packageNames[$i - 1]}
	echo "Downloading $name from aur..."
	curl "https://aur.archlinux.org/cgit/aur.git/snapshot/$name.tar.gz" --output $name.tar.gz --silent
	tar -xzf $name.tar.gz
done

cd ..

echo '===='
echo 'The current changes will try to apply.'
echo

for i in `seq 1 ${#packageNames[@]}` ;
do
	name=${packageNames[$i - 1]}
	currentVersion=${packageVersions[$i - 1]}
	candidateVersion=$(cat aur/$name/PKGBUILD | grep pkgver | head -n1 | cut -d "=" -f2)
    printf "%2s) %25s %20s > %20s \n" $i $name $currentVersion $candidateVersion
done

echo
go=0
skip=()
while [ $go -ne 1 ] ; do
	read -p "Enter package numbers one by one to skip or (y/n) to continue: " choice
	if   expr "$choice" : '[0-9]'  >/dev/null; then skip+=($choice); echo "Skipping # ${skip[*]} packages" 
	elif expr "$choice" : '[yY]'   >/dev/null; then go=1 
	elif expr "$choice" : '[nN]'   >/dev/null; then exit 0 
	else echo 
	fi
done


for i in `seq 1 ${#packageNames[@]}` ;
do
	name=${packageNames[$i - 1]}

	if [[ " ${skip[@]} " =~ " ${i} " ]]; then
		echo "Skipping $name"
		continue;
	fi
	
	echo "Updating $name"
	cd "./aur/$name"
	makepkg -sric
	cd ../..
done