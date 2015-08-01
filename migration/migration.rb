#!/usr/bin/env ruby
# Convert from the old mms database to the new sightings database
#
# Author: srldl
#
########################################

require './server'
require './config'
require 'net/http'
require  'net/ssh'
require 'net/scp'
require 'time'
require 'date'
require 'json'
require 'net-ldap'



module Couch

  class Migration


       #Get ready to put into database
       server = Couch::Server.new(Couch::Config::HOST1, Couch::Config::PORT1)

       #fetch UUID

       #Fetch a UUID from courchdb
       obj = server.get("http://"+Couch::Config::HOST1+":"+Couch::Config::PORT1+"/project/_all_docs")

       hashObj = JSON.parse(obj.body)
       #puts hashObj['rows'][0]

       for i in (0..(hashObj['rows'].size)-1)
       #for i in (0..3)
          #puts hashObj['rows'][i]["id"]
          #Get the object from the database
          res = server.get("http://"+Couch::Config::HOST1+":"+Couch::Config::PORT1+"/project/"+hashObj['rows'][i]["id"])
          @entry =  JSON.parse(res.body)

          #Remove any "edits" field
          @entry.tap { |hs| hs.delete("edits") }

          #Skip fields related_projects -no such fields in db
          #Skip fields results_datasets - no such fields in db

          #Find fields research_programs, initialization
          href = ''
          title = ''
          #Get fields if there is a research_programs entry
          if @entry.has_key?('research_programs')
            unless  @entry['research_programs'][0]['href'] == nil
               href = @entry['research_programs'][0]['href']
            end
            unless @entry['research_programs'][0]['title'] == nil
               title = @entry['research_programs'][0]['title']
            end

            #Move into links
            @new_link = { "href" => href, "rel" => "program", \
              "title" => title, "type" =>'mime-type'}

            if @entry.has_key?('links')
              (@entry['links']).insert(-1, @new_link)
            else
              @entry['links'] = [@new_link]
            end
            puts @entry['links']
            puts @entry['id']

            #Remove related projects
            @entry.tap { |hs| hs.delete("research_programs") }
          end

          #Post entry back to database
          doc = @entry.to_json

          res = server.post("/"+ Couch::Config::COUCH_DB_NAME + "/", doc, Couch::Config::USER, Couch::Config::PASSWORD)

 end #traverse database

end #class
end #module
