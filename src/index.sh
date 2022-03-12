node_path=`which node`
refresher_path="`pwd`/index.js"
command="$node_path"
job="0 0 * * 0 $command"

echo $refresher_path

# crontab -l | fgrep -i -v "$command" | { cat; echo "$job"; } | crontab -l