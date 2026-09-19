import React, { useState } from 'react';
import { ScreenView, PlotFilter, BrandPlot, BiddingWar, TickerEvent } from './types';
import { INITIAL_PLOTS, BIDDING_WARS_DATA, INITIAL_TICKER_EVENTS } from './data/mockData';
import { Header } from './components/Header';
import { FilterToolbar } from './components/FilterToolbar';
import { GridWall } from './components/GridWall';
import { BiddingWarsView } from './components/BiddingWarsView';
import { AvailablePlotsView } from './components/AvailablePlotsView';
import { ClaimModal } from './components/ClaimModal';
import { BrandModal } from './components/BrandModal';
import { CounterBidModal } from './components/CounterBidModal';
import { HelpModal } from './components/HelpModal';
import { LiveStreamTicker } from './components/LiveStreamTicker';
import { Footer } from './components/Footer';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenView>('grid');
  const [plots, setPlots] = useState<BrandPlot[]>(INITIAL_PLOTS);
  const [wars, setWars] = useState<BiddingWar[]>(BIDDING_WARS_DATA);
  const [tickerEvents, setTickerEvents] = useState<TickerEvent[]>(INITIAL_TICKER_EVENTS);

  // Filters & Controls
  const [currentFilter, setFilter] = useState<PlotFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);

  // Modals state
  const [selectedBrand, setSelectedBrand] = useState<BrandPlot | null>(null);
  const [plotToClaim, setPlotToClaim] = useState<BrandPlot | null>(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isCounterBidModalOpen, setIsCounterBidModalOpen] = useState(false);
  const [warSlotId, setWarSlotId] = useState('#088');
  const [warCurrentBid, setWarCurrentBid] = useState(175000);

  // Computed counts
  const claimedCount = 842 + plots.filter(p => p.status === 'claimed' && !INITIAL_PLOTS.some(ip => ip.id === p.id && ip.status === 'claimed')).length;
  const totalPlots = 1000;

  // Filtered plots
  const filteredPlots = plots.filter((plot) => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = plot.name.toLowerCase().includes(q);
      const matchTag = plot.tagline.toLowerCase().includes(q);
      const matchId = plot.id.toLowerCase().includes(q);
      const matchFounders = plot.founders?.toLowerCase().includes(q);
      const matchCategory = plot.category.toLowerCase().includes(q);
      const matchDescription = plot.description?.toLowerCase().includes(q);
      if (!matchName && !matchTag && !matchId && !matchFounders && !matchCategory && !matchDescription) {
        return false;
      }
    }

    // Tab filter
    if (currentFilter === 'claimable') {
      return plot.status === 'available';
    }
    if (currentFilter === 'wars') {
      return plot.status === 'war' || plot.badge?.type === 'war' || plot.badge?.type === 'bid';
    }
    if (currentFilter === 'unicorns') {
      return plot.category === 'Titan' || plot.category === 'Tech' || plot.category === 'Fintech' || plot.category === 'QuickCommerce' || plot.category === 'Ecommerce';
    }

    return true;
  });

  const availablePlotsList = plots.filter((p) => p.status === 'available');

  // Trigger claim flow
  const handleOpenClaimModal = (plot?: BrandPlot) => {
    const target = plot || availablePlotsList[0] || plots[4];
    setPlotToClaim(target);
    setIsClaimModalOpen(true);
  };

  // Complete Claim
  const handleConfirmClaim = (newBrandData: Partial<BrandPlot>) => {
    setPlots((prev) =>
      prev.map((p) => {
        if (p.id === newBrandData.id) {
          return {
            ...p,
            ...newBrandData,
            status: 'claimed',
            price: undefined,
            borderDashed: false,
          } as BrandPlot;
        }
        return p;
      })
    );

    // Add Live stream ticker event
    const newEvent: TickerEvent = {
      id: Date.now().toString(),
      type: 'claim',
      message: `⚡ ${newBrandData.name} claimed Slot ${newBrandData.id} for ₹1.00 via UPI`,
      timestamp: 'Just now',
      highlight: true,
    };
    setTickerEvents((prev) => [newEvent, ...prev.slice(0, 7)]);
  };

  // Trigger Counter Bid
  const handleOpenCounterBid = (slotId: string, currentBid: number = 175000) => {
    setWarSlotId(slotId);
    setWarCurrentBid(currentBid);
    setIsCounterBidModalOpen(true);
  };

  const handleConfirmBid = (slotId: string, challengerName: string, amount: number) => {
    // Update war data
    setWars((prev) =>
      prev.map((w) => {
        if (w.slotId === slotId) {
          return {
            ...w,
            challenger: {
              ...w.challenger,
              name: challengerName,
              bid: amount,
            },
            totalBids: w.totalBids + 1,
          };
        }
        return w;
      })
    );

    // Update plot
    setPlots((prev) =>
      prev.map((p) => {
        if (p.id === slotId) {
          return {
            ...p,
            currentBid: amount,
            badge: {
              text: `₹${amount.toLocaleString('en-IN')} LIVE BID BATTLE`,
              type: 'war',
            },
          };
        }
        return p;
      })
    );

    // Add ticker event
    const newEvent: TickerEvent = {
      id: Date.now().toString(),
      type: 'bid',
      message: `🔥 ${challengerName} placed ₹${amount.toLocaleString('en-IN')} counter-bid on Slot ${slotId}`,
      timestamp: 'Just now',
      highlight: true,
    };
    setTickerEvents((prev) => [newEvent, ...prev.slice(0, 7)]);
  };

  return (
    <div className="min-h-screen bg-[#050a15] text-slate-100 flex flex-col justify-between selection:bg-orange-500/30 selection:text-orange-200">
      <div>
        {/* Top Header */}
        <Header
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
          claimedCount={claimedCount}
          totalPlots={totalPlots}
          onOpenClaimModal={() => handleOpenClaimModal()}
        />

        {/* Filter Toolbar (Visible on Grid view) */}
        {activeScreen === 'grid' && (
          <FilterToolbar
            currentFilter={currentFilter}
            setFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
            resetZoom={() => setZoomLevel(100)}
          />
        )}

        {/* Screen View Router */}
        <main className="pb-8">
          {activeScreen === 'grid' && (
            <GridWall
              plots={filteredPlots}
              onSelectBrand={(b) => setSelectedBrand(b)}
              onClaimPlot={(p) => handleOpenClaimModal(p)}
              onOpenWar={(slotId) => {
                setActiveScreen('wars');
              }}
              zoomLevel={zoomLevel}
            />
          )}

          {activeScreen === 'wars' && (
            <BiddingWarsView
              wars={wars}
              onPlaceCounterBid={(warId, slotId, currentBid) =>
                handleOpenCounterBid(slotId, currentBid)
              }
            />
          )}

          {activeScreen === 'available' && (
            <AvailablePlotsView
              availablePlots={availablePlotsList}
              onClaimPlot={(p) => handleOpenClaimModal(p)}
            />
          )}
        </main>
      </div>

      {/* Persistent Bottom Components: Live Ad Stream & Footer */}
      <div>
        <LiveStreamTicker events={tickerEvents} />
        <Footer
          setActiveScreen={setActiveScreen}
          onOpenClaimModal={() => handleOpenClaimModal()}
          onOpenHelp={() => setIsHelpModalOpen(true)}
        />
      </div>

      {/* Interactive Modals */}
      <ClaimModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        plotToClaim={plotToClaim}
        onConfirmClaim={handleConfirmClaim}
      />

      <BrandModal
        brand={selectedBrand}
        onClose={() => setSelectedBrand(null)}
        onInitiateOutbid={(slotId, bid) => handleOpenCounterBid(slotId, bid)}
        onClaimAdjacent={(plotId) => handleOpenClaimModal()}
      />

      <CounterBidModal
        isOpen={isCounterBidModalOpen}
        onClose={() => setIsCounterBidModalOpen(false)}
        warSlotId={warSlotId}
        currentHighBid={warCurrentBid}
        onConfirmBid={handleConfirmBid}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        onOpenClaim={() => handleOpenClaimModal()}
      />
    </div>
  );
}
