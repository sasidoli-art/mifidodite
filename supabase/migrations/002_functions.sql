-- Funzione per incrementare il contatore lead
CREATE OR REPLACE FUNCTION increment_lead_count(sid UUID)
RETURNS void AS $$
BEGIN
  UPDATE strutture
  SET numero_lead_ricevuti = numero_lead_ricevuti + 1
  WHERE id = sid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
