git push
if [ $? != 0 ] ; then
    branchName=$(git branch --show-current)
    git push --set-upstream origin $branchName
fi
