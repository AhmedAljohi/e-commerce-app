#!/bin/bash

# GitIgnore Cleanup Script
# This script helps identify and fix files that should be ignored but are currently tracked

echo "🧹 GitIgnore Cleanup Script"
echo "=========================="

# Colors for output
red='\033[0;31m'
green='\033[0;32m'
yellow='\033[1;33m'
blue='\033[0;34m'
no_color='\033[0m'

echo "\n${blue}🔍 Checking for files that should be ignored...${no_color}"

# Check for common files that should be ignored
PROBLEM_FILES=()

# Check for lock files (should use only one package manager)
if git ls-files | grep -q "yarn.lock"; then
    echo "${yellow}⚠️  yarn.lock found - you're using pnpm, this should be ignored${no_color}"
    PROBLEM_FILES+=("yarn.lock")
fi

if git ls-files | grep -q "package-lock.json"; then
    echo "${yellow}⚠️  package-lock.json found - you're using pnpm, this should be ignored${no_color}"
    PROBLEM_FILES+=("package-lock.json")
fi

# Check for cache files
if git ls-files | grep -q "\.eslintcache"; then
    echo "${yellow}⚠️  .eslintcache found - this should be ignored${no_color}"
    PROBLEM_FILES+=(".eslintcache")
fi

# Check for OS files
if git ls-files | grep -q "\.DS_Store"; then
    echo "${yellow}⚠️  .DS_Store found - this should be ignored${no_color}"
    PROBLEM_FILES+=(".DS_Store")
fi

# Check for log files
if git ls-files | grep -q "\.log$"; then
    echo "${yellow}⚠️  Log files found - these should be ignored${no_color}"
    PROBLEM_FILES+=($(git ls-files | grep "\.log$"))
fi

# Check for build artifacts
if git ls-files | grep -q "\.next/"; then
    echo "${yellow}⚠️  .next/ directory found - this should be ignored${no_color}"
    PROBLEM_FILES+=($(git ls-files | grep "\.next/"))
fi

if [ ${#PROBLEM_FILES[@]} -eq 0 ]; then
    echo "${green}✅ No problematic files found!${no_color}"
    exit 0
fi

echo "\n${red}❌ Found ${#PROBLEM_FILES[@]} files that should be ignored:${no_color}"
for file in "${PROBLEM_FILES[@]}"; do
    echo "  - $file"
done

echo "\n${blue}🔧 To fix these issues, run:${no_color}"
echo "git rm --cached ${PROBLEM_FILES[*]}"
echo "git add .gitignore"
echo "git commit -m 'fix: remove tracked files that should be ignored'"

echo "\n${yellow}💡 Make sure these patterns are in your .gitignore:${no_color}"
echo "  - .eslintcache"
echo "  - yarn.lock"
echo "  - package-lock.json"
echo "  - .DS_Store"
echo "  - *.log"
echo "  - .next/"
