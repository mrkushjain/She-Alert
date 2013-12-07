class HarassmentsController < ApplicationController
  # GET /harassments
  # GET /harassments.json
  def index
    @harassments = Harassment.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @harassments }
    end
  end

  # GET /harassments/1
  # GET /harassments/1.json
  def show
    @harassment = Harassment.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @harassment }
    end
  end

  # GET /harassments/new
  # GET /harassments/new.json
  def new
    @harassment = Harassment.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @harassment }
    end
  end

  # GET /harassments/1/edit
  def edit
    @harassment = Harassment.find(params[:id])
  end

  # POST /harassments
  # POST /harassments.json
  def create
    @harassment = Harassment.new(params[:harassment])

    respond_to do |format|
      if @harassment.save
        format.html { redirect_to @harassment, notice: 'Harassment was successfully created.' }
        format.json { render json: @harassment, status: :created, location: @harassment }
      else
        format.html { render action: "new" }
        format.json { render json: @harassment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /harassments/1
  # PUT /harassments/1.json
  def update
    @harassment = Harassment.find(params[:id])

    respond_to do |format|
      if @harassment.update_attributes(params[:harassment])
        format.html { redirect_to @harassment, notice: 'Harassment was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @harassment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /harassments/1
  # DELETE /harassments/1.json
  def destroy
    @harassment = Harassment.find(params[:id])
    @harassment.destroy

    respond_to do |format|
      format.html { redirect_to harassments_url }
      format.json { head :no_content }
    end
  end
end
