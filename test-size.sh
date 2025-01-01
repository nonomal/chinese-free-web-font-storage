find ./dist -type f -name "*.woff2" -exec du -k {} + | awk '{total += $1; count++} END {if (count > 0) print "Average size in KB:", total/count; else print "No files found."}'
find ./dist -type f -name "*.woff2" -exec du -k {} + | sort -nr | head -n 1
