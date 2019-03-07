$sourceBranch = "c2cnew-3053-message-to-repcionist-standard-gp-attendances";
$destinationBranch = "sprint24";
$maxHistoryDepth = 100;

$sourceRevision = git rev-parse --verify $sourceBranch 2>&1;
$isRevisionValid = $sourceRevision -like '* *'; # revision should not contains spaces, otherwise: error message supposed to.

if ($isRevisionValid) {
    Write-Host "Source revision is missing";
    return;
} else {
    Write-Host "Source revision was found:" $sourceRevision;
}

$destinationRevision = git rev-parse --verify $destinationBranch 2>&1
$isRevisionValid = $destinationRevision -like '* *'; # revision should not contains spaces, otherwise: error message supposed to.

if ($isRevisionValid) {
    Write-Host "Destination revision is missing";
    return;
} else {
    Write-Host "Destination revision was found:" $destinationRevision;
}

Write-Host;
Write-Host;

if ($sourceRevision -eq $destinationRevision) {
    Write-Host "Source and destination are the same revision:" $sourceRevision;
    return;
}

$parents_of_commits_beyond_base = git rev-list --pretty=tformat:%P $sourceRevision --not $destinationRevision | Select-String '^commit';

Write-Host "History:";
Write-Host "  " (git name-rev $sourceRevision);

if ($parents_of_commits_beyond_base.Length -ne 0) {
    $currentDepth = 0;
    $parents_of_commits_beyond_base.Line | % { 
        Write-Host "  " (git name-rev $_.split(' ')[1]); 
        $currentDepth += 1;

        if ($currentDepth -gt $maxHistoryDepth) {
            Write-Host "  Stop history search due to max allowed depth reached";
            break;
        }
    }
}

Write-Host "  " (git name-rev $destinationRevision);
