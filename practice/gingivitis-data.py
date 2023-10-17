import os
import csv
import shutil

def scan_directory(directory_path):
    # Check if the directory exists
    if not os.path.exists(directory_path):
        print(f"Directory '{directory_path}' does not exist.")
        return
    # Loop through all files in the directory
    for filename in os.listdir(directory_path):
        csv_file_path = os.path.join(directory_path, filename)

        # Check if it's a CSV file
        if csv_file_path.lower().endswith(".csv"):
            # Read the CSV file
            if contains_word(csv_file_path, "gingivitis"):
                # If the word "gingivitis" is found, copy the corresponding .tif file
                copy_corresponding_tif(directory_path, filename)

def contains_word(file_path, target_word):
    # Check if the target word is present in the file
    with open(file_path, 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        for row in reader:
            for cell in row:
                if target_word.lower() in cell.lower():
                    return True
    return False

def copy_corresponding_tif(directory_path, csv_filename):
    # Get the base name without extension
    base_name = os.path.splitext(csv_filename)[0]
    base_name = base_name[:-6]

    # Form the corresponding .tif file path
    tif_file_path = os.path.join(directory_path, f"{base_name}.tif")

    # Check if the .tif file exists
    if os.path.exists(tif_file_path):
        # Copy the .tif file to the destination directory
        destination_directory = "../gingivitis"  
        shutil.copy(tif_file_path, os.path.join(destination_directory, f"{base_name}.tif"))
        print(f".tif file corresponding to '{csv_filename}' copied successfully.")
    else:
        print(f"Warning: .tif file corresponding to '{csv_filename}' not found.")

scan_directory('../dataset')