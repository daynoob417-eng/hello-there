#!/usr/bin/env bash
set -euo pipefail

psql --no-psqlrc --set ON_ERROR_STOP=1 --file scripts/ci/bootstrap-auth.sql
psql --no-psqlrc --set ON_ERROR_STOP=1 --file supabase/migrations/20261114140000_foundation_and_commercial_core.sql
psql --no-psqlrc --set ON_ERROR_STOP=1 --file scripts/ci/database-smoke.sql
