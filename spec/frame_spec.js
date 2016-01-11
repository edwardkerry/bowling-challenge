describe('Frame', function(){

  var frame

  beforeEach(function(){
    frame = new Frame();
  });

  describe('#results', function(){
    it('should be empty array', function(){
      expect(frame.results).toEqual([]);
    });
    describe('#getResults', function(){
      it('should return the current score', function(){
        expect(frame.getResults()).toEqual(frame.results);
      });
    });
  });

  describe('#currentRoll', function(){
    it('should initialize on roll 1', function(){
      expect(frame.currentRoll).toEqual(1);
    });

    it('should record the second roll', function(){
      frame.roll(7);
      expect(frame.currentRoll).toEqual(2);
    });

    describe('#_addRoll', function(){
      it('should add to the currentRoll count', function(){
        frame._addRoll();
        expect(frame.currentRoll).toEqual(2);
      });
    });
  });

  describe('#pins', function(){
    it('should start with 10 pins', function(){
      expect(frame.pins).toEqual(10);
    });
  });

  describe('#roll', function(){
    it('should reduce the number of standing pins', function(){
        frame.roll(4);
        expect(frame.results).toContain(4);
    });

    it('should not allow more than 10 pins to fall', function(){
      frame.roll(8);
      expect(function() { frame.roll(3); }).toThrow('Frame score may not exceed 10');
      expect(frame.results).toEqual([8]);
    });

    it('should record 0 pins', function(){
      frame.roll(0);
      frame.roll(0);
      expect(frame.results).toEqual([0,0]);
    });
  });

  describe('#checkComplete', function(){
    it('should return false if the frame is ongoing', function(){
      frame.roll(4);
      expect(frame.checkComplete()).toEqual(false);
    });
  });

  describe('#strike', function(){
    it('should end the frame if roll 1 hits 10', function(){
      frame.roll(10);
      expect(frame.checkComplete()).toEqual(true);
    });

    it('should add 0 to the score', function(){
      frame.roll(10);
      expect(frame.results).toContain(10, 0);
    });
  });

  describe('#rerack', function(){
    it('should reset the frame', function(){
      frame.roll(6);
      frame.roll(2);
      frame.rerack();
      expect(frame.results).toEqual([]);
      expect(frame.pins).toEqual(10);
      expect(frame.currentRoll).toEqual(1);
      expect(frame.score).toEqual(0);
    });
  });

})