#!/bin/bash

# Function to create a database
create_database() {
  local db_name=$1
  local db_user=$2
  local db_password=$3

  echo $1 $2 $3

  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE "$1";
    CREATE USER "$2" WITH PASSWORD "$3";
    GRANT ALL PRIVILEGES ON DATABASE "$1" TO "$2";
EOSQL
}

# Function to process each microservice
process_service_file() {
  local service_vars="$1"

  if [ -f "$service_vars" ]; then
    db_name=$(sed -n '1p' "$service_vars")
    db_user=$(sed -n '2p' "$service_vars")
    db_password=$(sed -n '3p' "$service_vars")

    # Use the environment variables from the setup file
    create_database "$db_name" "$db_user" "$db_password"
  else
    echo "Error: $service_vars not found. Skipping."
  fi
}

# Directory containing microservice setups
microservice_directory="./db_setup"

# Check if the directory exists
if [ ! -d "$microservice_directory" ]; then
  echo "Error: $microservice_directory directory not found."
  exit 1
fi

# Get a list of files in the directory
service_files=("$microservice_directory"/*_vars)

# Process each service file
for service_vars in "${service_files[@]}"; do
  echo "Processing service file: $service_vars"
  process_service_file "$service_vars"
done
