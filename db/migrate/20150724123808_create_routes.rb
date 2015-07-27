class CreateRoutes < ActiveRecord::Migration
  def change
    create_table :routes do |t|
      t.string :from
      t.string :to

      t.timestamps null: false
    end
  end
end
