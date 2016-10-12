- `$.emails[0:]` parses array into `VARCHAR(64)`
- `$.emails[0]` results in `Coercion error` warning
  - It is said to be a warning, while at the same time no rows are given in
    stream sample, so it should be considered as a fatal error for record.

    Maybe it is seen as a warning for a batch, but it is fatal for a record.
