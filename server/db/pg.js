LISTEN myEvent;

NOTIFY myEvent;

CREATE FUNCTION populatedRequests() RETURNS TRIGGER AS $$

  DECLARE
    data json;
    notification json;

  BEGIN

    
