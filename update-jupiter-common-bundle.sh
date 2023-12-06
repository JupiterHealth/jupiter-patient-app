repo_name="jupiter-patient-app"

rm -rf jupiter-commons
rm -rf jupiter-commons.bundle
cd ../
cd jupiter-commons
git pull origin master
git bundle create jupiter-commons.bundle HEAD master
mv jupiter-commons.bundle ../$repo_name
cd ../
cd $repo_name
git clone jupiter-commons.bundle