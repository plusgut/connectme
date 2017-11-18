conn = new Mongo();
db = conn.getDB("radiodb"); 
db.createCollection("locations");
db.locations.createIndex( { point : "2dsphere" } );