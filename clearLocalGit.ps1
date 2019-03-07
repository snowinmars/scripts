param (
    [string]$oldestValidSprint,
    [string]$currentSprint,
)
# v.1.0

# branches you love and don't want to delete anyway
$immuneBranches = @( 'master', `
                        'UI-master', `
                        '*sprint*')

Write-Host 'Started' -ForegroundColor Yellow

# Fetch all like Source tree
git -c diff.mnemonicprefix=false -c core.quotepath=false fetch --prune origin

$currentBranch = (git rev-parse --abbrev-ref HEAD -q).Trim();
Write-Host 'You was on branch' $currentBranch -ForegroundColor Yellow

if ($currentBranch -ne 'master') {
    Write-Host 'Checking out to master' -ForegroundColor Yellow
    git checkout master -q
}



############################



Write-Host 'Checking sprints' -NoNewline -ForegroundColor Yellow

$allRemotesSprintBranches = git branch -r -q `
        | Where-Object { $_ -like '*sprint*' } `
        | % { $_.Trim() }

$allLocalSprintBranches = git branch -l -q `
        | Where-Object { $_ -like '*sprint*' } `
        | % { $_.Trim() }

$irrelevantSprintBranches = $allLocalSprintBranches | % { "origin/" + $_ } | ?{-not ($allRemotesSprintBranches -contains $_)}

if ($irrelevantSprintBranches.Length -ne 0) {
    Write-Host ''
    Write-Host ''
    Write-Host 'There are local sprint branches that does not exists on server' -ForegroundColor Yellow
    Write-Host 'Do you want to delete these local sprint branches?' -ForegroundColor Yellow
    Write-Host ''
    $irrelevantSprintBranches
    Write-Host ''
    Write-Host 'Remove? y/n' -ForegroundColor Yellow

    $answer = Read-Host

    if ($answer -eq 'y') {
        $irrelevantSprintBranches | % {
            git branch -d ($_.Substring("origin/".Length)) -q 
        }
    } else {
        Write-Host 'Ok, I wont touch them';
    }
}

Write-Host '   ... done' -ForegroundColor Green





$outOfDateLocalSprints = git branch -l -q `
        | Where-Object { $_.split('sprint') }



############################



$relevantSprintBranches = $allRemotesSprintBranches | ?{-not ($allLocalSprintBranches  -contains $_.Substring("origin/".Length))}

$relevantSprintBranches | % {
        Write-Host 'Checking out' $_ 
    } | % { 
        git checkout -b $_.Substring("origin/".Length) $_ -q 
    }

$allRemotesSprintBranches += 'master';
$allRemotesSprintBranches += 'UI-master';



############################



$branchesThatCanBeSafelyRemove = @()
$irrelevantLocalBranches = @()
$mergeBranches = @()

$allRemotesSprintBranches | % {
    Write-Host 'Checking' $_

    $allBranches =
        git branch -a --merged $_ -q `
        | % { $_.Trim() } `
        | Where-Object { `
            if ($_[0] -eq "*") { `
                $_ = $_.Substring(2) `
            } `

            $__ = $_
            ( $immuneBranches | Where-Object { $__ -like $_ } ).Length -eq 0 `
        };

    $remoteBranches = $allBranches | Where-Object { $_ -like 'remotes/origin/*' } | % { $_.Substring("remotes/origin/".Length) }
    $localBranches = $allBranches | Where-Object { $_ -notlike 'remotes/origin/*' }

    $irrelevantLocalBranches += $localBranches | ?{-not ($remoteBranches -contains $_)}

    if ($localBranches -ne $null -and $remoteBranches -ne $null) {
        $branchesThatCanBeSafelyRemove += Compare-Object $remoteBranches $localBranches -PassThru -IncludeEqual -ExcludeDifferent
    }
}

$mergeBranches = git branch -l -q `
                    | Where-Object { $_ -Match '.*-merge' } `
                    | % { $_.Trim() }

$branchesThatCanBeSafelyRemove = $branchesThatCanBeSafelyRemove | sort-object | Get-Unique
$irrelevantLocalBranches = $irrelevantLocalBranches | sort-object | Get-Unique

if ($branchesThatCanBeSafelyRemove.Length -ne 0) {
    Write-Host ''
    Write-Host ''
    Write-Host 'Can be safely remove:' -ForegroundColor Yellow
    Write-Host ''

    $branchesThatCanBeSafelyRemove

    Write-Host ''
    Write-Host 'Remove? y/n' -ForegroundColor Yellow

    $answer = Read-Host

    if ($answer -eq 'y') {
        $branchesThatCanBeSafelyRemove | % { git branch -D $_ -q }
    } else {
        Write-Host 'Ok, I wont touch them';
    }
}

if ($irrelevantLocalBranches.Length -ne 0) {
    Write-Host ''
    Write-Host ''
    Write-Host 'These branches does not present on the server. Ensure that you want to remove the following:' -ForegroundColor Yellow
    Write-Host ''

    $irrelevantLocalBranches

    Write-Host ''
    Write-Host 'Remove? y/n' -ForegroundColor Yellow

    $answer = Read-Host

    if ($answer -eq 'y') {
        $irrelevantLocalBranches | % { git branch -D $_ -q }
    } else {
        Write-Host 'Ok, I wont touch them';
    }
}

if ($mergeBranches.Length -ne 0) {
    Write-Host ''
    Write-Host ''
    Write-Host 'These branches was created for merge purposes, you dont really need it. Ensure that you want to remove the following:' -ForegroundColor Yellow
    Write-Host ''

    $mergeBranches

    Write-Host ''
    Write-Host 'Remove? y/n' -ForegroundColor Yellow

    $answer = Read-Host

    if ($answer -eq 'y') {
        $mergeBranches | % { git branch -D $_ -q }
    } else {
        Write-Host 'Ok, I wont touch them';
    }
}

$localBranchesForUpdate= git branch -l -q | % { $_.Trim() } | Where-Object { $_ -notlike "master" }
$i = 0;

$localBranchesForUpdate | % { `
    Write-Host "Updating $($_) ($($i)/$($localBranchesForUpdate.Length))" -NoNewline

    if ((git branch --list -r ('origin/' + $_) -q).Length -eq 0) {
        Write-Host ' Branch exists only locally' -ForegroundColor Yellow
        Write-Host ' Do you want to delete it? y/n' -ForegroundColor Yellow

        $answer = Read-Host
        
        if ($answer -eq 'y') {
            git branch -D $_ -q 
        } else {
            Write-Host 'Ok, I wont touch them';
        }

    } else {
        git fetch 'origin' "$($_):$($_)" -q
        Write-Host '   ... done' -ForegroundColor Green
    }

    $i++;
}

git checkout "master" -q

Write-Host ''
Write-Host ''
Write-Host 'Everything done well' -ForegroundColor Green

Read-Host