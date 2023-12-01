#!/bin/bash

# List of microservice names
microservices=("users" "events")

# Directory to store the setup files
output_directory="./db_setup"

# Create the directory if it doesn't exist
mkdir -p "$output_directory"

# Function to create setup directory with database credentials
create_setup_files() {
  # Iterate over microservices
  for service in "${microservices[@]}"; do
    local env_file="./$service/code/.env"
    local output_file="$output_directory/${service}_vars"

    # Check if the .env file exists
    if [ -f "$env_file" ]; then
      # Extract DB_NAME, DB_USER, and DB_PASSWORD from the .env file
      db_name=$(grep -E '^POSTGRES_DB=' "$env_file" | cut -d '=' -f 2)
      db_user=$(grep -E '^POSTGRES_USER=' "$env_file" | cut -d '=' -f 2)
      db_password=$(grep -E '^POSTGRES_PASSWORD=' "$env_file" | cut -d '=' -f 2)

      # Write values to the credentials file
      echo "$db_name" > "$output_file"
      echo "$db_user" >> "$output_file"
      echo "$db_password" >> "$output_file"
    else
      echo "Warning: $env_file not found for $service. Skipping."
    fi
  done

  echo "Generated setup files"
}

# Call the function to create the setup files
create_setup_files
