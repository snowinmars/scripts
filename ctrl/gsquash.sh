git reset $(git merge-base master $(git rev-parse --abbrev-ref HEAD))
