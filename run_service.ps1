param($service)

Write-Host "Starting $service..."

# Load .env
Get-Content .env | Foreach-Object {
    if ($_ -match "^\s*([^#=]+)\s*=\s*(.*)") {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        [System.Environment]::SetEnvironmentVariable($name, $value, [System.EnvironmentVariableTarget]::Process)
    }
}

cd backend\$service
.\mvnw.cmd spring-boot:run -DskipTests
