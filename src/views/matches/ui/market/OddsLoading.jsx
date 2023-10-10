import React from 'react';

const LoadingOddCell = ({ style, className }) => {
  return (
    <span
      style={{ width: '16%', height: '35px', ...style }}
      className={`placeholder placeholder-lg rounded-1 ${className}`}
    />
  );
};

const SixColsLoading = ({ rows = 1 }) => {
  const emptyRows = Array.from({ length: rows }, (_, k) => k);

  return emptyRows.map((row) => (
    <div key={row} className="placeholder-glow row py-1">
      <div className="col-6 d-none d-xxl-block">
        <span
          className="px-2 mt-2 col-12 placeholder placeholder-lg rounded-1"
          style={{ height: '20px', backgroundColor: 'lightgray' }}
        />
      </div>

      <div className="col-12 col-xxl-6 ps-xxl-3">
        <div className="ms-xxl-1 ps-xxl-3 d-flex justify-content-between">
          <LoadingOddCell className="bg-primary" />
          <LoadingOddCell className="bg-primary" />
          <LoadingOddCell className="bg-primary" />
          <LoadingOddCell className="bg-danger" />
          <LoadingOddCell className="bg-danger" />
          <LoadingOddCell className="bg-danger" />
        </div>
      </div>
    </div>
  ));
};

const TwoColsLoading = ({ rows = 5 }) => {
  const emptyRows = Array.from({ length: rows }, (_, k) => k);

  return emptyRows.map((row) => (
    <div key={row} className="placeholder-glow row py-1">
      <div className="col-6 d-none d-xxl-block">
        <span
          className="px-2 mt-2 col-12 placeholder placeholder-lg bg-secondary rounded-1"
          style={{ height: '20px' }}
        />
      </div>

      <div className="col-12 col-xxl-6 ps-xxl-2">
        <div className="ps-xxl-1 d-flex">
          <LoadingOddCell className="bg-danger" style={{ width: '34%' }} />
          <LoadingOddCell
            className="ms-1 bg-primary"
            style={{ width: '34%' }}
          />
        </div>
      </div>
    </div>
  ));
};

export const MatchOddsLoading = () => {
  return (
    <div className="px-2">
      <SixColsLoading rows={2} />
    </div>
  );
};

export const BookmakerLoading = () => {
  return (
    <div className="px-2">
      <SixColsLoading rows={2} />
    </div>
  );
};

export const FancyLoading = () => {
  return (
    <div className="row">
      <div className="col-6">
        <div className="px-2">
          <TwoColsLoading rows={5} />
        </div>
      </div>
      <div className="col-6 pe-2">
        <div className="ps-4">
          <TwoColsLoading rows={5} />
        </div>
      </div>
    </div>
  );
};
