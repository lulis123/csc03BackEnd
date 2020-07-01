if [ ! "$(sudo docker ps -a | grep MongoDBCSC03)" ]
then
   sudo docker run --name MongoDBCSC03 -p 27016:27017 -d mongo
else
   sudo docker container start MongoDBCSC03
fi

