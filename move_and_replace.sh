#!/bin/bash

# 检查参数数量
if [ $# -ne 2 ]; then
  echo "使用方法: $0 <源目录> <目标目录>"
  exit 1
fi

source_dir=$1
target_dir=$2

# 硬编码的排除文件列表
exclude_files=(
  ".git"
  ".gitignore"
  ".DS_Store"
)

# 检查源目录是否存在
if [ ! -d "$source_dir" ]; then
  echo "错误: 源目录 $source_dir 不存在"
  exit 1
fi

# 创建目标目录(如果不存在)
mkdir -p "$target_dir"

echo "正在移动文件从 $source_dir 到 $target_dir (已排除.git等文件)"

# 构建rsync排除参数
exclude_params=()
for file in "${exclude_files[@]}"; do
  exclude_params+=(--exclude="$file")
done

rsync -a --delete "${exclude_params[@]}" --progress "$source_dir/" "$target_dir/"

if [ $? -eq 0 ]; then
  echo "文件已成功移动(已排除预定义文件)"
else
  echo "移动文件过程中出错"
  exit 1
fi