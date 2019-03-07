# v.1.1

$name = "*Dmitry Tkachenko*"
$i = 0

$branches = git branch -r `
    | Where-Object { $_ -notlike "*HEAD*" } `
    | Select-Object -First 100;

$myBranches = $branches | % { `
            Write-Progress -Activity "Searching..." -PercentComplete ($i / $branches.Length * 100); `
            $i++; `
            $b = git show --format=`"%ai %ar by %an`" $($_.Trim()) | Select -First 1 ; `
            git merge-base --is-ancestor $_.Trim() origin/master;
            $isMerged = $?

            if ($b -like $name) { `
                return new-object psobject -Property @{ name = $b; isMergedToMaster = $isMerged } `
            } `
        };

$myBranches | Format-Table;

Write-Host ''
Write-Host ''

Write-Host "Done" -ForegroundColor Green

Read-Host